"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesAgent = void 0;
const leads_1 = require("../models/leads");
const customers_1 = require("../models/customers");
const agentLogs_1 = require("../models/agentLogs");
const alerts_1 = require("../models/alerts");
const tasks_1 = require("../queue/tasks");
const logger_1 = require("../config/logger");
const redact_1 = require("../utils/redact");
const memory_1 = require("../services/memory");
const agentComms_1 = require("../services/agentComms");
const budget_1 = require("../utils/budget");
// Sales agent evaluates incoming leads and determines whether they
// qualify for further consideration.  In this updated version, a
// qualified lead triggers a scope building task instead of jumping
// directly to estimate creation.  The scope agent will assemble the
// detailed scope of work and identify subcontractor needs before
// initiating estimate creation.
const serviceAreas = [
    'burns',
    'harney',
    'marion',
    'polk',
    'linn',
    'benton',
    'yamhill',
    'salem',
    'keizer',
    'albany',
    'corvallis',
    'lebanon',
    'mcminnville',
    'dallas',
    'independence',
    'monmouth',
    'philomath'
];
const serviceTypes = ['water-damage', 'mold-remediation', 'home-remodel', 'restoration', 'remodel'];
const normalize = (value) => (value !== null && value !== void 0 ? value : '').trim().toLowerCase();
const salesAgent = async (task, _runtime) => {
    var _a, _b;
    const leadId = task.payload.leadId;
    const lead = await (0, leads_1.getLeadById)(leadId);
    if (!lead) {
        logger_1.logger.warn({ leadId }, 'Sales agent: lead not found');
        return;
    }
    const areaMatch = serviceAreas.some((area) => [lead.city, lead.state, lead.zip, lead.address].some((field) => normalize(field).includes(area)));
    const serviceMatch = serviceTypes.includes(normalize(lead.service_type));
    const hasContact = Boolean(lead.email && lead.full_name && lead.phone);
    const hasLocation = Boolean(lead.city || lead.state || lead.zip);
    const hasBudget = Boolean(lead.budget_range);
    const hasTimeline = Boolean(lead.timeline);
    const decisionMaker = lead.decision_maker === true;
    const hasInsuranceStatus = Boolean(lead.insurance_status);
    const insuranceStatus = normalize(lead.insurance_status);
    const insuranceLead = insuranceStatus.includes('insurance') || insuranceStatus.includes('claim');
    const hasInsuranceDetails = !insuranceLead || (lead.loss_date && lead.carrier);
    const budgetRisk = (0, budget_1.isLowBudget)(lead.budget_range);
    const score = (areaMatch ? 30 : 0) +
        (serviceMatch ? 30 : 0) +
        (hasBudget ? 10 : 0) +
        (hasTimeline ? 10 : 0) +
        (decisionMaker ? 10 : 0) +
        (hasInsuranceStatus ? 10 : 0);
    const notes = `areaMatch=${areaMatch} serviceMatch=${serviceMatch} budget=${hasBudget} timeline=${hasTimeline} decisionMaker=${decisionMaker} insurance=${hasInsuranceStatus}`;
    let outcome = 'needs_info';
    if (!hasContact) {
        await (0, leads_1.updateLeadStatus)(leadId, 'needs_info', 'Missing contact info', score);
        await (0, alerts_1.createAlert)({
            status: 'open',
            severity: 'high',
            message: 'Lead missing contact info',
            entityType: 'lead',
            entityId: leadId
        });
        outcome = 'needs_info';
    }
    else if (!hasLocation) {
        await (0, leads_1.updateLeadStatus)(leadId, 'needs_info', 'Missing service location', score);
        await (0, alerts_1.createAlert)({
            status: 'open',
            severity: 'medium',
            message: 'Lead missing service location details',
            entityType: 'lead',
            entityId: leadId
        });
        outcome = 'needs_info';
    }
    else if (!hasBudget || !hasTimeline || !decisionMaker || !hasInsuranceStatus || !hasInsuranceDetails) {
        await (0, leads_1.updateLeadStatus)(leadId, 'needs_info', 'Missing qualification fields', score);
        await (0, alerts_1.createAlert)({
            status: 'open',
            severity: 'medium',
            message: 'Lead missing qualification fields (budget/timeline/decision/insurance)',
            entityType: 'lead',
            entityId: leadId
        });
        outcome = 'needs_info';
    }
    else if (!areaMatch || !serviceMatch) {
        await (0, leads_1.updateLeadStatus)(leadId, 'rejected', 'Outside service area or service type', score);
        outcome = 'rejected';
    }
    else if (budgetRisk && !insuranceLead) {
        await (0, leads_1.updateLeadStatus)(leadId, 'rejected', 'Budget below minimum viable range', score);
        await (0, alerts_1.createAlert)({
            status: 'open',
            severity: 'low',
            message: 'Lead rejected for low budget',
            entityType: 'lead',
            entityId: leadId
        });
        outcome = 'rejected';
    }
    else {
        // Lead is qualified.  Update status and prepare to build scope.
        await (0, leads_1.updateLeadStatus)(leadId, 'qualified', notes, score);
        outcome = 'qualified';
        const existing = await (0, customers_1.findCustomerByEmail)(lead.email);
        if (!existing) {
            await (0, customers_1.createCustomer)({
                fullName: lead.full_name,
                email: lead.email,
                phone: lead.phone,
                address: lead.address,
                city: lead.city,
                state: lead.state,
                zip: lead.zip
            });
        }
        // Instead of immediately creating an estimate, enqueue a scope build task.
        await (0, tasks_1.enqueueTask)({
            type: 'scope.build',
            payload: { leadId },
            traceId: task.traceId
        });
        // Log the handoff from sales to scope.
        await (0, agentComms_1.recordHandoff)({
            fromAgent: 'Sales Agent',
            toAgent: 'Scope Agent',
            entityType: 'lead',
            entityId: leadId,
            status: 'qualified',
            assumptions: ['Service area match', 'Service type match', 'Decision maker confirmed'],
            numbers: { score },
            risks: budgetRisk ? ['Budget sensitivity flagged'] : [],
            confidence: budgetRisk ? 0.6 : 0.8,
            nextAction: 'Build detailed scope and align subcontractors'
        });
    }
    // Update metrics and memory.  This section remains unchanged from the base
    // implementation but helps track sales performance over time.
    (0, memory_1.incrementMemoryCounter)('sales.metrics', 'processed', 1);
    (0, memory_1.incrementMemoryCounter)('sales.metrics', outcome, 1);
    (0, memory_1.incrementMemoryCounter)('sales.metrics', `service_${lead.service_type}`, 1);
    const metrics = (0, memory_1.incrementMemoryCounter)('sales.metrics', 'playbook_checks', 0);
    const processed = Number((_a = metrics.processed) !== null && _a !== void 0 ? _a : 0);
    const needsInfo = Number((_b = metrics.needs_info) !== null && _b !== void 0 ? _b : 0);
    const missingRate = processed ? Number((needsInfo / processed).toFixed(2)) : 0;
    if (processed % 5 === 0 && missingRate > 0.2) {
        (0, memory_1.upsertMemory)('sales.playbook', {
            recommendation: 'Tighten lead form validation and add required phone field.',
            missingContactRate: missingRate,
            updatedAt: new Date().toISOString()
        });
    }
    await (0, agentLogs_1.createAgentLog)({
        agentName: 'Sales Agent',
        action: 'lead_qualification',
        entityType: 'lead',
        entityId: leadId,
        traceId: task.traceId,
        payload: {
            leadId,
            maskedEmail: (0, redact_1.maskEmail)(lead.email),
            maskedPhone: (0, redact_1.maskPhone)(lead.phone),
            score,
            notes
        }
    });
    logger_1.logger.info({ leadId, score }, 'Sales agent processed lead');
};
exports.salesAgent = salesAgent;
