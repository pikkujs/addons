import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTicketFormStatusesInput = z.object({
  ticket_form_id: z.string().optional().describe("Filter by ticket form ID.\n\nSupports single ID or comma-separated list of IDs.\n"),
  filter: z.object({
  custom_status_id: z.string().optional().describe("Filter by custom status ID (comma-separated)"),
  id: z.string().optional().describe("Filter by status ID (comma-separated)"),
}).optional().describe("Additional filter criteria. Example: {\"custom_status_id\":\"789\",\"id\":\"123,456\"}"),
})

export const ListTicketFormStatusesOutput = z.object({
  ticket_form_statuses: z.array(z.object({
    custom_status_id: z.number().int().optional().describe("The id of the associated custom status"),
    id: z.string().optional().describe("Automatically assigned when creating a ticket form"),
    ticket_form_id: z.number().int().optional().describe("The id of the associated ticket form"),
  })).max(1).optional(),
})

export const listTicketFormStatuses = pikkuSessionlessFunc({
  description: "Fetches all of the ticket form statuses for the account.\n\nSupports filtering by ticket form ID and other criteria using query parameters.\n\n#### Allowed For\n\n* Admins\n* Agents",
  input: ListTicketFormStatusesInput,
  output: ListTicketFormStatusesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_form_statuses", data) as any
  },
})
