// Shared types and interfaces for the Benson agentic system.

// Extend existing types with additional tasks for scope building,
// subcontractor management and customer onboarding.  These new
// task types enable the end‑to‑end workflow from lead intake
// through subcontractor matching and customer onboarding.  They
// follow the same naming convention as existing tasks.

export type LeadStatus =
  | 'new'
  | 'qualified'
  | 'needs_info'
  | 'rejected'
  | 'estimate_sent'
  | 'signed'

export type ProjectStatus = 'scheduled' | 'in_progress' | 'completed' | 'closed'

export type ProposalStatus = 'draft' | 'sent' | 'signed' | 'declined'

export type TaskType =
  | 'lead.new'
  | 'lead.qualified'
  | 'estimate.create'
  | 'proposal.send'
  | 'proposal.signed'
  | 'project.schedule'
  | 'project.execute'
  | 'ops.check'
  | 'invoice.create'
  | 'finance.collections'
  | 'marketing.weekly'
  | 'seo.weekly'
  | 'insurance.review'
  | 'data.daily'
  | 'compliance.audit'
  | 'ceo.review'
  // New tasks for the autonomous GC pipeline
  | 'scope.build'
  | 'subcontractor.search'
  | 'subcontractor.onboard'
  | 'customer.onboard'

export type QueueTask = {
  type: TaskType
  payload: Record<string, unknown>
  traceId: string
}

export type LineItem = {
  code: string
  name: string
  unit: string
  unitCost: number
  quantity: number
}

export type EstimateLineItems = LineItem[]