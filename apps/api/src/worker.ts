import { Worker } from 'bullmq'
import { connection } from './queue/queue'
import { logger } from './config/logger'
import { salesAgent } from './agents/salesAgent'
import { estimatorAgent } from './agents/estimatorAgent'
import { proposalAgent } from './agents/proposalAgent'
import { projectAgent } from './agents/projectAgent'
import { operationsAgent } from './agents/operationsAgent'
import { financeAgent } from './agents/financeAgent'
import { marketingAgent } from './agents/marketingAgent'
import { ceoAgent } from './agents/ceoAgent'
import { QueueTask } from '@bhs/shared'
import { createAgentRuntime } from './agents/agentRuntime'
import { insuranceAgent } from './agents/insuranceAgent'
import { seoAgent } from './agents/seoAgent'
import { dataAgent } from './agents/dataAgent'
import { complianceAgent } from './agents/complianceAgent'
import { startWorkerSchedules } from './queue/scheduler'
// Import new agents for scope, subcontractor management and customer onboarding
import { scopeAgent } from './agents/scopeAgent'
import { subcontractorSearchAgent } from './agents/subcontractorSearchAgent'
import { subcontractorOnboardAgent } from './agents/subcontractorOnboardAgent'
import { customerOnboardAgent } from './agents/customerOnboardAgent'

const runtime = createAgentRuntime()

const handler = async (job: { data: QueueTask }) => {
  const { type } = job.data

  switch (type) {
    case 'lead.new':
      return salesAgent(job.data, runtime)
    case 'lead.qualified':
    case 'estimate.create':
      return estimatorAgent(job.data, runtime)
    case 'proposal.send':
    case 'proposal.signed':
      return proposalAgent(job.data, runtime)
    case 'project.schedule':
    case 'project.execute':
      return projectAgent(job.data, runtime)
    case 'ops.check':
      return operationsAgent(job.data, runtime)
    case 'invoice.create':
    case 'finance.collections':
      return financeAgent(job.data, runtime)
    case 'marketing.weekly':
      return marketingAgent(job.data, runtime)
    case 'seo.weekly':
      return seoAgent(job.data, runtime)
    case 'insurance.review':
      return insuranceAgent(job.data, runtime)
    case 'data.daily':
      return dataAgent(job.data, runtime)
    case 'compliance.audit':
      return complianceAgent(job.data, runtime)
    case 'ceo.review':
      return ceoAgent(job.data, runtime)
    // Handle new custom pipeline tasks
    case 'scope.build':
      return scopeAgent(job.data, runtime)
    case 'subcontractor.search':
      return subcontractorSearchAgent(job.data, runtime)
    case 'subcontractor.onboard':
      return subcontractorOnboardAgent(job.data, runtime)
    case 'customer.onboard':
      return customerOnboardAgent(job.data, runtime)
    default:
      logger.warn({ task: job.data }, 'Unhandled task type')
  }
}

const worker = new Worker('bhs-tasks', handler, { connection })

startWorkerSchedules()

worker.on('completed', (job) => {
  logger.info({ jobId: job.id, name: job.name }, 'Task completed')
})

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, name: job?.name, err }, 'Task failed')
})

logger.info('Worker started')