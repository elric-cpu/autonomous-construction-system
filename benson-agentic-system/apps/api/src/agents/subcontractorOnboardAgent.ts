import { QueueTask } from '@bhs/shared'
import { getSubcontractorById, updateSubcontractorStatus } from '../models/subcontractors'
import { createAgentLog } from '../models/agentLogs'
import { recordHandoff } from '../services/agentComms'
import { AgentRuntimeContext } from './agentRuntime'
import { logger } from '../config/logger'

/**
 * The subcontractor onboard agent finalizes the activation of a
 * subcontractor.  It sets their status to active and logs the
 * onboarding.  In a more robust system this would also send
 * contracts, collect insurance certificates and verify licensing.
 */
export const subcontractorOnboardAgent = async (task: QueueTask, _runtime?: AgentRuntimeContext) => {
  const { subcontractorId } = task.payload as { subcontractorId: string }
  const sub = getSubcontractorById(subcontractorId)

  if (!sub) {
    logger.warn({ subcontractorId }, 'Subcontractor onboard agent: subcontractor not found')
    return
  }

  // Update status to active to indicate the subcontractor is ready for assignments.
  updateSubcontractorStatus(subcontractorId, 'active')

  logger.info({ subcontractorId }, 'Subcontractor onboard agent: subcontractor activated')

  // Record the handoff to the next stage (scope already triggered estimate creation and customer onboarding).
  await recordHandoff({
    fromAgent: 'Subcontractor Onboard Agent',
    toAgent: 'Operations',
    entityType: 'subcontractor',
    entityId: subcontractorId,
    status: 'subcontractor_active',
    assumptions: ['Basic onboarding complete'],
    numbers: {},
    risks: [],
    confidence: 0.8,
    nextAction: 'Schedule work on upcoming project'
  })

  // Log onboarding completion.
  await createAgentLog({
    agentName: 'Subcontractor Onboard Agent',
    action: 'subcontractor_onboarded',
    entityType: 'subcontractor',
    entityId: subcontractorId,
    traceId: task.traceId,
    payload: {
      status: 'active'
    }
  })
}