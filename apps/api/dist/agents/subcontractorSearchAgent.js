"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subcontractorSearchAgent = void 0;
const subcontractors_1 = require("../models/subcontractors");
const tasks_1 = require("../queue/tasks");
const agentLogs_1 = require("../models/agentLogs");
const agentComms_1 = require("../services/agentComms");
const logger_1 = require("../config/logger");
/**
 * The subcontractor search agent simulates finding a new subcontractor
 * when none exist for a required trade and property type.  In a real
 * implementation this would interface with external directories,
 * vetting services or human approvals.  Here it creates a dummy
 * subcontractor record and then schedules an onboarding task.
 */
const subcontractorSearchAgent = async (task, _runtime) => {
    const { trade, propertyType, leadId } = task.payload;
    // Create a placeholder subcontractor.  In practice this would be
    // replaced with real search and vetting logic.
    const sub = (0, subcontractors_1.createSubcontractor)({
        name: `${trade} Specialist`,
        trade,
        propertyType,
        email: `${trade}@example.com`,
        phone: '555-0000'
    });
    logger_1.logger.info({ subcontractorId: sub.id, trade }, 'Subcontractor search agent: created new subcontractor');
    // Record the handoff to the onboarding agent.
    await (0, agentComms_1.recordHandoff)({
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
    });
    // Enqueue onboarding task for the new subcontractor.
    await (0, tasks_1.enqueueTask)({
        type: 'subcontractor.onboard',
        payload: { subcontractorId: sub.id, leadId },
        traceId: task.traceId
    });
    // Create a log entry for auditing.
    await (0, agentLogs_1.createAgentLog)({
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
    });
};
exports.subcontractorSearchAgent = subcontractorSearchAgent;
