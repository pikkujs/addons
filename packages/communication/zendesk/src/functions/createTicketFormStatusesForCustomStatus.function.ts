import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateTicketFormStatusesForCustomStatusInput = z.object({
  custom_status_id: z.number().int().describe("The id of the custom status. Example: 1234567"),
  ticket_form_status: z.array(z.object({
  ticket_form_id: z.number().int().optional().describe("The id of the ticket form"),
})).optional(),
})

export const CreateTicketFormStatusesForCustomStatusOutput = z.object({
  ticket_form_statuses: z.array(z.object({
    custom_status_id: z.number().int().optional().describe("The id of the associated custom status"),
    id: z.string().optional().describe("Automatically assigned when creating a ticket form"),
    ticket_form_id: z.number().int().optional().describe("The id of the associated ticket form"),
  })).max(1).optional(),
})

export const createTicketFormStatusesForCustomStatus = pikkuSessionlessFunc({
  description: "Creates one or many tickets form status associations for a custom status.\n\n#### Allowed For\n\n* Admins",
  input: CreateTicketFormStatusesForCustomStatusInput,
  output: CreateTicketFormStatusesForCustomStatusOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/custom_statuses/{custom_status_id}/ticket_form_statuses", data) as any
  },
})
