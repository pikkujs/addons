import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateTicketFormStatusesInput = z.object({
  ticket_form_id: z.number().int().describe("The ID of the ticket form. Example: 47"),
  ticket_form_status: z.array(z.object({
  custom_status_id: z.number().int(),
})),
})

export const CreateTicketFormStatusesOutput = z.object({
  ticket_form_statuses: z.array(z.object({
    custom_status_id: z.number().int().optional().describe("The id of the associated custom status"),
    id: z.string().optional().describe("Automatically assigned when creating a ticket form"),
    ticket_form_id: z.number().int().optional().describe("The id of the associated ticket form"),
  })).max(1).optional(),
})

export const createTicketFormStatuses = pikkuSessionlessFunc({
  description: "Creates one or many ticket form status associations\n\n#### Allowed For\n\n* Admins",
  input: CreateTicketFormStatusesInput,
  output: CreateTicketFormStatusesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses", data) as any
  },
})
