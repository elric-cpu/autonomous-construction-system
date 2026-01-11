"use strict";
// In-memory subcontractor model for demonstration purposes.  In a
// production deployment, this would be backed by a database table.  A
// subcontractor record includes a unique identifier, the trade they
// perform (e.g. framing, plumbing), the property type they serve
// (residential or commercial), contact details and a status flag
// indicating whether they are active, onboarding or paused.
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSubcontractors = exports.updateSubcontractorStatus = exports.getSubcontractorById = exports.createSubcontractor = exports.findSubcontractorsByTrade = void 0;
// Simple in‑memory array acting as our subcontractor database.
const subcontractors = [];
// Generate a unique ID for new subcontractors.
const generateId = () => {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
};
/**
 * Find subcontractors matching a given trade and property type.
 *
 * @param trade The trade category (e.g. framing, plumbing)
 * @param propertyType The property type (residential or commercial)
 */
const findSubcontractorsByTrade = (trade, propertyType) => {
    return subcontractors.filter((sub) => sub.trade === trade && sub.propertyType === propertyType && sub.status === 'active');
};
exports.findSubcontractorsByTrade = findSubcontractorsByTrade;
/**
 * Create a new subcontractor record.  Returns the newly created
 * subcontractor.
 */
const createSubcontractor = (input) => {
    const sub = {
        id: generateId(),
        name: input.name,
        trade: input.trade,
        propertyType: input.propertyType,
        email: input.email,
        phone: input.phone,
        status: 'onboarding'
    };
    subcontractors.push(sub);
    return sub;
};
exports.createSubcontractor = createSubcontractor;
/**
 * Retrieve a subcontractor by ID.
 */
const getSubcontractorById = (id) => {
    return subcontractors.find((sub) => sub.id === id);
};
exports.getSubcontractorById = getSubcontractorById;
/**
 * Update a subcontractor's status.  Returns the updated record.
 */
const updateSubcontractorStatus = (id, status) => {
    const sub = subcontractors.find((s) => s.id === id);
    if (sub) {
        sub.status = status;
    }
    return sub;
};
exports.updateSubcontractorStatus = updateSubcontractorStatus;
/**
 * For testing/demo purposes, seed a few subcontractors into the
 * in‑memory list.  Real implementations would remove this seeding
 * logic.
 */
const seedSubcontractors = () => {
    if (subcontractors.length === 0) {
        subcontractors.push({
            id: generateId(),
            name: 'Acme Framing Co.',
            trade: 'framing',
            propertyType: 'residential',
            email: 'acme@example.com',
            phone: '555-1234',
            status: 'active'
        }, {
            id: generateId(),
            name: 'Elite Plumbing LLC',
            trade: 'plumbing',
            propertyType: 'residential',
            email: 'elite@example.com',
            phone: '555-5678',
            status: 'active'
        });
    }
};
exports.seedSubcontractors = seedSubcontractors;
