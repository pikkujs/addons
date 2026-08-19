import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TicketFormTicketFormStatusesInput = z.object({
  ticket_form_id: z.number().int().describe("The ID of the ticket form. Example: 47"),
})

export const TicketFormTicketFormStatusesOutput = z.object({
  ticket_form_statuses: z.array(z.object({
    custom_status_id: z.number().int().optional().describe("The id of the associated custom status"),
    id: z.string().optional().describe("Automatically assigned when creating a ticket form"),
    ticket_form_id: z.number().int().optional().describe("The id of the associated ticket form"),
  })).max(1).optional(),
})

export const ticketFormTicketFormStatuses = pikkuSessionlessFunc({
  description: "Fetches all of the associated ticket form statuses of a ticket form.\n\n#### Allowed For\n\n* Anyone",
  input: TicketFormTicketFormStatusesInput,
  output: TicketFormTicketFormStatusesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses", data) as any
  },
})
