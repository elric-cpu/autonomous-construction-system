"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerOnboardAgent = void 0;
const leads_1 = require("../models/leads");
const customers_1 = require("../models/customers");
const agentLogs_1 = require("../models/agentLogs");
const agentComms_1 = require("../services/agentComms");
const logger_1 = require("../config/logger");
/**
 * The customer onboard agent welcomes the client to the project.  It
 * ensures a customer record exists, updates the lead status and logs
 * the onboarding.  Additional functionality such as sending welcome
 * emails, collecting deposits and signing agreements would be added in
 * a real system.
 */
const customerOnboardAgent = async (task, _runtime) => {
    var _a;
    const { leadId } = task.payload;
    const lead = await (0, leads_1.getLeadById)(leadId);
    if (!lead) {
        logger_1.logger.warn({ leadId }, 'Customer onboard agent: lead not found');
        return;
    }
    // Ensure a customer record exists
    let customer = lead.email ? await (0, customers_1.findCustomerByEmail)(lead.email) : null;
    if (!customer && lead.email) {
        customer = await (0, customers_1.createCustomer)({
            fullName: lead.full_name,
            email: lead.email,
            phone: lead.phone,
            address: lead.address,
            city: lead.city,
            state: lead.state,
            zip: lead.zip
        });
    }
    // Update lead status to indicate onboarding has started
    await (0, leads_1.updateLeadStatus)(leadId, 'estimate_sent', 'Customer onboarding initiated');
    // Record the handoff to operations/project teams after onboarding
    await (0, agentComms_1.recordHandoff)({
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
    });
    // Log the onboarding
    await (0, agentLogs_1.createAgentLog)({
        agentName: 'Customer Onboard Agent',
        action: 'customer_onboarded',
        entityType: 'lead',
        entityId: leadId,
        traceId: task.traceId,
        payload: {
            customerId: (_a = customer === null || customer === void 0 ? void 0 : customer.id) !== null && _a !== void 0 ? _a : null
        }
    });
    logger_1.logger.info({ leadId }, 'Customer onboard agent processed onboarding');
};
exports.customerOnboardAgent = customerOnboardAgent;
