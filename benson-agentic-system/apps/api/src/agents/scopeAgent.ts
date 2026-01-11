import { QueueTask } from '@bhs/shared'
import { getLeadById, updateLeadStatus } from '../models/leads'
import { findSubcontractorsByTrade, seedSubcontractors } from '../models/subcontractors'
import { enqueueTask } from '../queue/tasks'
import { createAgentLog } from '../models/agentLogs'
import { recordHandoff } from '../services/agentComms'
import { AgentRuntimeContext } from './agentRuntime'
import { logger } from '../config/logger'

/**
 * The scope agent builds a high‑level scope of work for a qualified lead.
 * It determines which subcontractor trade is required based on the
 * lead's service type and property type (simplified for this demo).
 * If suitable subcontractors are available, it assigns one and
 * progresses the workflow.  Otherwise, it enqueues a search task to
 * recruit a new subcontractor.  In all cases it triggers customer
 * onboarding and estimate creation as follow‑up tasks.
 */
export const scopeAgent = async (task: QueueTask, _runtime?: AgentRuntimeContext) => {
  const leadId = task.payload.leadId as string
  const lead = await getLeadById(leadId)

  if (!lead) {
    logger.warn({ leadId }, 'Scope agent: lead not found')
    return
  }

  // Derive a trade and propertyType from the lead.  In a
  // fully featured system, service_type and additional fields would
  // determine multiple trades.  Here we use the service_type as the
  // trade and assume all work is residential.
  const trade = String(lead.service_type ?? '').toLowerCase()
  const propertyType: 'residential' | 'commercial' = 'residential'

  // Seed the subcontractor database with default entries if empty
  seedSubcontractors()

  // Look for existing subcontractors matching this trade/property
  const matches = findSubcontractorsByTrade(trade, propertyType)
  const hasSub = matches.length > 0

  if (hasSub) {
    // Assign the first matching subcontractor (simplified).  We don't
    // persist the assignment here but a production system would create
    // a project record linking the subcontractor to the lead or
    // estimate.  For demonstration, we just log the match.
    const assignedSub = matches[0]
    logger.info({ leadId, subcontractorId: assignedSub.id }, 'Scope agent: assigned subcontractor')

    await recordHandoff({
      fromAgent: 'Scope Agent',
      toAgent: 'Subcontractor Coordinator',
      entityType: 'lead',
      entityId: leadId,
      status: 'subcontractor_assigned',
      assumptions: ['Trade match found in existing database'],
      numbers: {},
      risks: [],
      confidence: 0.9,
      nextAction: 'Confirm subcontractor availability and send estimate'
    })
  } else {
    // No subcontractor found.  Enqueue a search task to recruit one.
    await enqueueTask({
      type: 'subcontractor.search',
      payload: { trade, propertyType, leadId },
      traceId: task.traceId
    })

    await recordHandoff({
      fromAgent: 'Scope Agent',
      toAgent: 'Subcontractor Search Agent',
      entityType: 'lead',
      entityId: leadId,
      status: 'searching_subcontractor',
      assumptions: ['No existing subcontractor match'],
      numbers: {},
      risks: ['Schedule delay if recruiting takes too long'],
      confidence: 0.6,
      nextAction: 'Recruit qualified subcontractor and onboard'
    })
  }

  // Enqueue customer onboarding to begin client engagement.
  await enqueueTask({
    type: 'customer.onboard',
    payload: { leadId },
    traceId: task.traceId
  })

  // Enqueue estimate creation to generate pricing based on the scope.
  await enqueueTask({
    type: 'estimate.create',
    payload: { leadId },
    traceId: task.traceId
  })

  // Log the scope build action
  await createAgentLog({
    agentName: 'Scope Agent',
    action: 'scope_built',
    entityType: 'lead',
    entityId: leadId,
    traceId: task.traceId,
    payload: {
      trade,
      propertyType,
      subcontractorFound: hasSub
    }
  })

  logger.info({ leadId }, 'Scope agent processed scope build')
}