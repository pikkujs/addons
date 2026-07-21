import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowChangesToTicketInput = z.object({
  macro_id: z.number().int().describe("The ID of the macro. Example: 25"),
  normalize_comment: z.boolean().optional().describe("If true, normalizes the newline formatting of the macro's comment to more closely match the formatting produced by the ticket comment editor"),
})

export const ShowChangesToTicketOutput = z.object({
  result: z.object({
    ticket: z.object({
      assignee_id: z.number().int().optional(),
      comment: z.object({
        body: z.string().optional(),
        public: z.boolean().optional(),
        scoped_body: z.array(z.array(z.string())).optional(),
      }).optional(),
      fields: z.object({
        id: z.number().int().optional(),
        value: z.string().optional(),
      }).optional(),
      group_id: z.number().int().optional(),
      id: z.number().int().optional(),
      url: z.string().optional(),
    }).optional(),
  }).optional(),
})

export const showChangesToTicket = pikkuSessionlessFunc({
  description: "Returns the changes the macro would make to a ticket. It doesn't actually\nchange a ticket. You can use the response data in a subsequent API call\nto the [Tickets](/api-reference/ticketing/tickets/tickets/) endpoint to update the ticket.\n\nThe response includes only the ticket fields that would be changed by the\nmacro. To get the full ticket object after the macro is applied,\nsee [Show Ticket After Changes](#show-ticket-after-changes).\n\n#### Allowed For\n* Agents",
  input: ShowChangesToTicketInput,
  output: ShowChangesToTicketOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/macros/{macro_id}/apply", data) as any
  },
})
