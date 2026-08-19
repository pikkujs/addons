import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTicketContentPinsInput = z.object({
  ticket_id: z.string().optional().describe("The id of the ticket for which to list content pins"),
})

export const ListTicketContentPinsOutput = z.object({
  count: z.number().int().optional().describe("Total number of content pins for the ticket."),
  ticket_content_pins: z.array(z.object({
    account_id: z.string().optional().describe("The ID of the account that owns the content pin."),
    content_id: z.string().optional().describe("The ID of the content that is pinned."),
    content_type: z.string().optional().describe("The type of content that is pinned. Example: external_content"),
    created_at: z.string().datetime().optional().describe("The timestamp when the content pin was created."),
    id: z.string().optional().describe("The unique identifier for the content pin."),
    locale: z.string().nullable().optional().describe("The locale of the content pin."),
    ticket_id: z.string().optional().describe("The ID of the ticket associated with the content pin."),
    url: z.string().optional().describe("The URL to access the pinned content."),
  })).optional(),
})

export const listTicketContentPins = pikkuSessionlessFunc({
  description: "Lists the content pins for a specific ticket. Content pins are used to pin related content such as articles to a ticket for quick access. This endpoint returns the content pins associated with the specified ticket id.\n\n#### Allowed For\n\n* Agents",
  input: ListTicketContentPinsInput,
  output: ListTicketContentPinsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_content_pins", data) as any
  },
})
