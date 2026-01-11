// In-memory subcontractor model for demonstration purposes.  In a
// production deployment, this would be backed by a database table.  A
// subcontractor record includes a unique identifier, the trade they
// perform (e.g. framing, plumbing), the property type they serve
// (residential or commercial), contact details and a status flag
// indicating whether they are active, onboarding or paused.

export type Subcontractor = {
  id: string
  name: string
  trade: string
  propertyType: 'residential' | 'commercial'
  email?: string
  phone?: string
  status: 'active' | 'onboarding' | 'inactive'
}

// Simple in‑memory array acting as our subcontractor database.
const subcontractors: Subcontractor[] = []

// Generate a unique ID for new subcontractors.
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
}

/**
 * Find subcontractors matching a given trade and property type.
 *
 * @param trade The trade category (e.g. framing, plumbing)
 * @param propertyType The property type (residential or commercial)
 */
export const findSubcontractorsByTrade = (
  trade: string,
  propertyType: 'residential' | 'commercial'
): Subcontractor[] => {
  return subcontractors.filter(
    (sub) => sub.trade === trade && sub.propertyType === propertyType && sub.status === 'active'
  )
}

/**
 * Create a new subcontractor record.  Returns the newly created
 * subcontractor.
 */
export const createSubcontractor = (input: {
  name: string
  trade: string
  propertyType: 'residential' | 'commercial'
  email?: string
  phone?: string
}): Subcontractor => {
  const sub: Subcontractor = {
    id: generateId(),
    name: input.name,
    trade: input.trade,
    propertyType: input.propertyType,
    email: input.email,
    phone: input.phone,
    status: 'onboarding'
  }
  subcontractors.push(sub)
  return sub
}

/**
 * Retrieve a subcontractor by ID.
 */
export const getSubcontractorById = (id: string): Subcontractor | undefined => {
  return subcontractors.find((sub) => sub.id === id)
}

/**
 * Update a subcontractor's status.  Returns the updated record.
 */
export const updateSubcontractorStatus = (
  id: string,
  status: Subcontractor['status']
): Subcontractor | undefined => {
  const sub = subcontractors.find((s) => s.id === id)
  if (sub) {
    sub.status = status
  }
  return sub
}

/**
 * For testing/demo purposes, seed a few subcontractors into the
 * in‑memory list.  Real implementations would remove this seeding
 * logic.
 */
export const seedSubcontractors = () => {
  if (subcontractors.length === 0) {
    subcontractors.push(
      {
        id: generateId(),
        name: 'Acme Framing Co.',
        trade: 'framing',
        propertyType: 'residential',
        email: 'acme@example.com',
        phone: '555-1234',
        status: 'active'
      },
      {
        id: generateId(),
        name: 'Elite Plumbing LLC',
        trade: 'plumbing',
        propertyType: 'residential',
        email: 'elite@example.com',
        phone: '555-5678',
        status: 'active'
      }
    )
  }
}