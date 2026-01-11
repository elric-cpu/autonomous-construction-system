import { QueueTask } from '@bhs/shared'
import { createSubcontractor } from '../models/subcontractors'
import { enqueueTask } from '../queue/tasks'
import { createAgentLog } from '../models/agentLogs'
import { recordHandoff } from '../services/agentComms'
import { AgentRuntimeContext } from './agentRuntime'
import { logger } from '../config/logger'

/**
 * The subcontractor search agent simulates finding a new subcontractor
 * when none exist for a required trade and property type.  In a real
 * implementation this would interface with external directories,
 * vetting services or human approvals.  Here it creates a dummy
 * subcontractor record and then schedules an onboarding task.
 */
export const subcontractorSearchAgent = async (task: QueueTask, _runtime?: AgentRuntimeContext) => {
  const { trade, propertyType, leadId } = task.payload as {
    trade: string
    propertyType: 'residential' | 'commercial'
    leadId: string
  }

  // Create a placeholder subcontractor.  In practice this would be
  // replaced with real search and vetting logic.
  const sub = createSubcontractor({
    name: `${trade} Specialist`,
    trade,
    propertyType,
    email: `${trade}@example.com`,
    phone: '555-0000'
  })

  logger.info({ subcontractorId: sub.id, trade }, 'Subcontractor search agent: created new subcontractor')

  // Record the handoff to the onboarding agent.
  await recordHandoff({
    fromAgent: 'Subcontractor Search Agent',
    toAgent: 'Subcontractor Onboard Agent',
    entityType: 'subcontractor',
    entityId: sub.id,
    status: 'subcontractor_created',
    assumptions: ['Placeholder subcontractor created for demo'],
    numbers: {},
    risks: ['Quality unknown until vetting complete'],
    confidence: 0.5,
    nextAction: 'Onboard subcontractor and verify credentials'
  })

  // Enqueue onboarding task for the new subcontractor.
  await enqueueTask({
    type: 'subcontractor.onboard',
    payload: { subcontractorId: sub.id, leadId },
    traceId: task.traceId
  })

  // Create a log entry for auditing.
  await createAgentLog({
    agentName: 'Subcontractor Search Agent',
    action: 'subcontractor_created',
    entityType: 'subcontractor',
    entityId: sub.id,
    traceId: task.traceId,
    payload: {
      trade,
      propertyType,
      leadId
    }
  })
}