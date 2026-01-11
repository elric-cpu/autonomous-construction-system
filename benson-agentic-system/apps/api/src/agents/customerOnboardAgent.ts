import { QueueTask } from '@bhs/shared'
import { getLeadById, updateLeadStatus } from '../models/leads'
import { createCustomer, findCustomerByEmail } from '../models/customers'
import { createAgentLog } from '../models/agentLogs'
import { recordHandoff } from '../services/agentComms'
import { AgentRuntimeContext } from './agentRuntime'
import { logger } from '../config/logger'

/**
 * The customer onboard agent welcomes the client to the project.  It
 * ensures a customer record exists, updates the lead status and logs
 * the onboarding.  Additional functionality such as sending welcome
 * emails, collecting deposits and signing agreements would be added in
 * a real system.
 */
export const customerOnboardAgent = async (task: QueueTask, _runtime?: AgentRuntimeContext) => {
  const { leadId } = task.payload as { leadId: string }
  const lead = await getLeadById(leadId)
  if (!lead) {
    logger.warn({ leadId }, 'Customer onboard agent: lead not found')
    return
  }

  // Ensure a customer record exists
  let customer = lead.email ? await findCustomerByEmail(lead.email) : null
  if (!customer && lead.email) {
    customer = await createCustomer({
      fullName: lead.full_name,
      email: lead.email,
      phone: lead.phone,
      address: lead.address,
      city: lead.city,
      state: lead.state,
      zip: lead.zip
    })
  }

  // Update lead status to indicate onboarding has started
  await updateLeadStatus(leadId, 'estimate_sent', 'Customer onboarding initiated')

  // Record the handoff to operations/project teams after onboarding
  await recordHandoff({
    fromAgent: 'Customer Onboard Agent',
    toAgent: 'Operations',
    entityType: 'lead',
    entityId: leadId,
    status: 'customer_onboarded',
    assumptions: ['Customer record created/updated'],
    numbers: {},
    risks: [],
    confidence: 0.9,
    nextAction: 'Proceed with estimate review and scheduling'
  })

  // Log the onboarding
  await createAgentLog({
    agentName: 'Customer Onboard Agent',
    action: 'customer_onboarded',
    entityType: 'lead',
    entityId: leadId,
    traceId: task.traceId,
    payload: {
      customerId: customer?.id ?? null
    }
  })

  logger.info({ leadId }, 'Customer onboard agent processed onboarding')
}