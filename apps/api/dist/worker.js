"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const queue_1 = require("./queue/queue");
const logger_1 = require("./config/logger");
const salesAgent_1 = require("./agents/salesAgent");
const estimatorAgent_1 = require("./agents/estimatorAgent");
const proposalAgent_1 = require("./agents/proposalAgent");
const projectAgent_1 = require("./agents/projectAgent");
const operationsAgent_1 = require("./agents/operationsAgent");
const financeAgent_1 = require("./agents/financeAgent");
const marketingAgent_1 = require("./agents/marketingAgent");
const ceoAgent_1 = require("./agents/ceoAgent");
const agentRuntime_1 = require("./agents/agentRuntime");
const insuranceAgent_1 = require("./agents/insuranceAgent");
const seoAgent_1 = require("./agents/seoAgent");
const dataAgent_1 = require("./agents/dataAgent");
const complianceAgent_1 = require("./agents/complianceAgent");
const scheduler_1 = require("./queue/scheduler");
// Import new agents for scope, subcontractor management and customer onboarding
const scopeAgent_1 = require("./agents/scopeAgent");
const subcontractorSearchAgent_1 = require("./agents/subcontractorSearchAgent");
const subcontractorOnboardAgent_1 = require("./agents/subcontractorOnboardAgent");
const customerOnboardAgent_1 = require("./agents/customerOnboardAgent");
const runtime = (0, agentRuntime_1.createAgentRuntime)();
const handler = async (job) => {
    const { type } = job.data;
    switch (type) {
        case 'lead.new':
            return (0, salesAgent_1.salesAgent)(job.data, runtime);
        case 'lead.qualified':
        case 'estimate.create':
            return (0, estimatorAgent_1.estimatorAgent)(job.data, runtime);
        case 'proposal.send':
        case 'proposal.signed':
            return (0, proposalAgent_1.proposalAgent)(job.data, runtime);
        case 'project.schedule':
        case 'project.execute':
            return (0, projectAgent_1.projectAgent)(job.data, runtime);
        case 'ops.check':
            return (0, operationsAgent_1.operationsAgent)(job.data, runtime);
        case 'invoice.create':
        case 'finance.collections':
            return (0, financeAgent_1.financeAgent)(job.data, runtime);
        case 'marketing.weekly':
            return (0, marketingAgent_1.marketingAgent)(job.data, runtime);
        case 'seo.weekly':
            return (0, seoAgent_1.seoAgent)(job.data, runtime);
        case 'insurance.review':
            return (0, insuranceAgent_1.insuranceAgent)(job.data, runtime);
        case 'data.daily':
            return (0, dataAgent_1.dataAgent)(job.data, runtime);
        case 'compliance.audit':
            return (0, complianceAgent_1.complianceAgent)(job.data, runtime);
        case 'ceo.review':
            return (0, ceoAgent_1.ceoAgent)(job.data, runtime);
        // Handle new custom pipeline tasks
        case 'scope.build':
            return (0, scopeAgent_1.scopeAgent)(job.data, runtime);
        case 'subcontractor.search':
            return (0, subcontractorSearchAgent_1.subcontractorSearchAgent)(job.data, runtime);
        case 'subcontractor.onboard':
            return (0, subcontractorOnboardAgent_1.subcontractorOnboardAgent)(job.data, runtime);
        case 'customer.onboard':
            return (0, customerOnboardAgent_1.customerOnboardAgent)(job.data, runtime);
        default:
            logger_1.logger.warn({ task: job.data }, 'Unhandled task type');
    }
};
const worker = new bullmq_1.Worker('bhs-tasks', handler, { connection: queue_1.connection });
(0, scheduler_1.startWorkerSchedules)();
worker.on('completed', (job) => {
    logger_1.logger.info({ jobId: job.id, name: job.name }, 'Task completed');
});
worker.on('failed', (job, err) => {
    logger_1.logger.error({ jobId: job === null || job === void 0 ? void 0 : job.id, name: job === null || job === void 0 ? void 0 : job.name, err }, 'Task failed');
});
logger_1.logger.info('Worker started');
