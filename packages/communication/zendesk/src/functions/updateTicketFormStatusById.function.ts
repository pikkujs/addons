import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateTicketFormStatusByIdInput = z.object({
  ticket_form_id: z.number().int().describe("The ID of the ticket form. Example: 47"),
  ticket_form_status_id: z.string().describe("The id of the ticket form status. Example: \"abcdef\""),
  ticket_form_status: z.array(z.object({
  _destroy: z.string().optional().describe("If set to a value of \\\"1\\\" and an id value is passed, the server will delete the record"),
  custom_status_id: z.number().int().optional(),
  id: z.string().optional(),
})),
})

export const UpdateTicketFormStatusByIdOutput = z.object({
  ticket_form_statuses: z.array(z.object({
    custom_status_id: z.number().int().optional().describe("The id of the associated custom status"),
    id: z.string().optional().describe("Automatically assigned when creating a ticket form"),
    ticket_form_id: z.number().int().optional().describe("The id of the associated ticket form"),
  })).max(1).optional(),
})

export const updateTicketFormStatusById = pikkuSessionlessFunc({
  description: "Updates or deletes ticket form status association by id.\n\n#### Allowed For\n\n* Admins",
  input: UpdateTicketFormStatusByIdInput,
  output: UpdateTicketFormStatusByIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/ticket_forms/{ticket_form_id}/ticket_form_statuses/{ticket_form_status_id}", data) as any
  },
})
