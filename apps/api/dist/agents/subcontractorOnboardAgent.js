"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subcontractorOnboardAgent = void 0;
const subcontractors_1 = require("../models/subcontractors");
const agentLogs_1 = require("../models/agentLogs");
const agentComms_1 = require("../services/agentComms");
const logger_1 = require("../config/logger");
/**
 * The subcontractor onboard agent finalizes the activation of a
 * subcontractor.  It sets their status to active and logs the
 * onboarding.  In a more robust system this would also send
 * contracts, collect insurance certificates and verify licensing.
 */
const subcontractorOnboardAgent = async (task, _runtime) => {
    const { subcontractorId } = task.payload;
    const sub = (0, subcontractors_1.getSubcontractorById)(subcontractorId);
    if (!sub) {
        logger_1.logger.warn({ subcontractorId }, 'Subcontractor onboard agent: subcontractor not found');
        return;
    }
    // Update status to active to indicate the subcontractor is ready for assignments.
    (0, subcontractors_1.updateSubcontractorStatus)(subcontractorId, 'active');
    logger_1.logger.info({ subcontractorId }, 'Subcontractor onboard agent: subcontractor activated');
    // Record the handoff to the next stage (scope already triggered estimate creation and customer onboarding).
    await (0, agentComms_1.recordHandoff)({
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
    });
    // Log onboarding completion.
    await (0, agentLogs_1.createAgentLog)({
        agentName: 'Subcontractor Onboard Agent',
        action: 'subcontractor_onboarded',
        entityType: 'subcontractor',
        entityId: subcontractorId,
        traceId: task.traceId,
        payload: {
            status: 'active'
        }
    });
};
exports.subcontractorOnboardAgent = subcontractorOnboardAgent;
