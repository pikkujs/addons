import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowTicketAuditInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
  ticket_audit_id: z.number().int().describe("The ID of the ticket audit. Example: 2127301143"),
})

export const ShowTicketAuditOutput = z.object({
  audit: z.object({
    author_id: z.number().int().optional().describe("The user who created the audit"),
    created_at: z.string().datetime().optional().describe("The time the audit was created"),
    events: z.array(z.record(z.string(), z.unknown())).optional().describe("An array of the events that happened in this audit. See the [Ticket Audit events reference](/documentation/ticketing/reference-guides/ticket-audit-events-reference)"),
    id: z.number().int().optional().describe("Automatically assigned when creating audits"),
    metadata: z.record(z.string(), z.unknown()).optional().describe("Metadata for the audit, custom and system data"),
    ticket_id: z.number().int().optional().describe("The ID of the associated ticket"),
    via: z.object({
      channel: z.string().optional().describe("This tells you how the ticket or event was created. Examples: \"web\", \"mobile\", \"rule\", \"system\""),
      source: z.record(z.string(), z.unknown()).optional().describe("For some channels a source object gives more information about how or why the ticket or event was created"),
    }).optional().describe("Describes how the object was created. See the [Via object reference](/documentation/ticketing/reference-guides/via-object-reference)"),
  }).optional(),
})

export const showTicketAudit = pikkuSessionlessFunc({
  description: "#### Allowed for\n\n* Agents",
  input: ShowTicketAuditInput,
  output: ShowTicketAuditOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/audits/{ticket_audit_id}", data) as any
  },
})
