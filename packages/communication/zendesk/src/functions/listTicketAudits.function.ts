import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTicketAuditsInput = z.object({
  "page[before]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.before_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[after]": z.string().optional().describe("A [pagination cursor](/documentation/api-basics/pagination/paginating-through-lists-using-cursor-pagination) that tells the endpoint which page to start on. It should be a `meta.after_cursor` value from a previous request. Note: `page[before]` and `page[after]` can't be used together in the same request.\n"),
  "page[size]": z.number().int().optional().describe("Specifies how many records to be returned in the response. You can specify up to 100 records per page."),
})

export const ListTicketAuditsOutput = z.object({
  after_cursor: z.string().optional(),
  after_url: z.string().optional(),
  audits: z.array(z.object({
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
  })).optional(),
  before_cursor: z.string().optional(),
  before_url: z.string().optional(),
})

export const listTicketAudits = pikkuSessionlessFunc({
  description: "Returns ticket audits. Archived tickets are not included in the response. Use the [List Audits for a Ticket](#list-audits-for-a-ticket) endpoint to\nretrieve audit records for an archived ticket. To learn more about archived tickets, see [About archived tickets](https://support.zendesk.com/hc/en-us/articles/4408887617050).\n\nThis endpoint should not be used for capturing change data. When continually chasing the tail of a cursor, some records will be skipped. For this use case, use the [Incremental Ticket Event Export API](/api-reference/ticketing/ticket-management/incremental_exports/#incremental-ticket-event-export).\n\n#### Allowed For\n\n* Admins",
  input: ListTicketAuditsInput,
  output: ListTicketAuditsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_audits", data) as any
  },
})
