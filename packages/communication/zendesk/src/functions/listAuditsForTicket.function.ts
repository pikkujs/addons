import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListAuditsForTicketInput = z.object({
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 123456"),
  page: z.union([z.number().int(), z.object({
  after: z.string().optional().describe("Cursor token for next page"),
  before: z.string().optional().describe("Cursor token for previous page"),
  size: z.number().int().min(1).optional().describe("Number of records per page"),
})]).optional().describe("Pagination parameter. Supports both traditional offset and cursor-based pagination:\n\n- Traditional: `?page=2` (integer page number)\n- Cursor: `?page[size]=50&page[after]=cursor` (deepObject with size, after, before)\n\nThese are mutually exclusive - use one format or the other, not both.\n"),
  sort: z.string().optional().describe("Field to sort results by. Prefix with `-` for descending order.\n\nWhen used with cursor pagination, this determines the cursor ordering.\n\nExample: `?sort=name` or `?sort=-created_at`\n. Example: \"name\""),
  include: z.string().optional().describe("A comma-separated list of sideloads to include in the response.\n"),
  include_boundary_indicators: z.boolean().optional().describe("When true, includes `has_more` indicator in the cursor pagination response meta.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
  include_item_cursors: z.boolean().optional().describe("When true, includes cursor values for each item in the cursor pagination response.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
  filter_events: z.array(z.string()).optional().describe("Filter audit events by type. Use the format `filter_events[]=Type1&filter_events[]=Type2`."),
  sort_order: z.enum(["asc", "desc"]).optional().describe("Sort order. Defaults to \"asc\""),
})

export const ListAuditsForTicketOutput = z.object({
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
  count: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
})

export const listAuditsForTicket = pikkuSessionlessFunc({
  description: "Lists the audits for a specified ticket.\n\n#### Pagination\n\n- Cursor pagination (recommended)\n- Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n**Note**: Audits for [Archived Tickets](https://support.zendesk.com/hc/en-us/articles/4408887617050) do not support pagination for this endpoint.\n\n#### Allowed for\n\n* Agents",
  input: ListAuditsForTicketInput,
  output: ListAuditsForTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/audits", data) as any
  },
})
