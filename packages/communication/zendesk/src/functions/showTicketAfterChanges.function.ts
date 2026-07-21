import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowTicketAfterChangesInput = z.object({
  macro_id: z.number().int().describe("The ID of the macro. Example: 25"),
  ticket_id: z.number().int().describe("The ID of the ticket. Example: 35436"),
  normalize_comment: z.boolean().optional().describe("If true, normalizes the newline formatting of the macro's comment to more closely match the formatting produced by the ticket comment editor"),
})

export const ShowTicketAfterChangesOutput = z.object({
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

export const showTicketAfterChanges = pikkuSessionlessFunc({
  description: "Returns the full ticket object as it would be after applying the macro to the ticket.\nIt doesn't actually change the ticket.\n\nTo get only the ticket fields that would be changed by the macro,\nsee [Show Changes to Ticket](#show-changes-to-ticket).\n\n#### Allowed For\n\n* Agents",
  input: ShowTicketAfterChangesInput,
  output: ShowTicketAfterChangesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/tickets/{ticket_id}/macros/{macro_id}/apply", data) as any
  },
})
