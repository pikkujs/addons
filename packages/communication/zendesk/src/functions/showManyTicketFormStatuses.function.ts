import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowManyTicketFormStatusesInput = z.object({
  ids: z.string().describe("Ticket form status ids to retrieve records for. Example: \"abc,def,ghi\""),
})

export const ShowManyTicketFormStatusesOutput = z.object({
  ticket_form_statuses: z.array(z.object({
    custom_status_id: z.number().int().optional().describe("The id of the associated custom status"),
    id: z.string().optional().describe("Automatically assigned when creating a ticket form"),
    ticket_form_id: z.number().int().optional().describe("The id of the associated ticket form"),
  })).max(1).optional(),
})

export const showManyTicketFormStatuses = pikkuSessionlessFunc({
  description: "Fetches all of the ticket form statuses specified by a comma separated list of ids.\n\n#### Allowed For\n\n* Anyone",
  input: ShowManyTicketFormStatusesInput,
  output: ShowManyTicketFormStatusesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/ticket_form_statuses/show_many", data) as any
  },
})
