import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListTicketsFullfilledByUserInput = z.object({
  ticket_ids: z.number().int().describe("The IDs of the relevant tickets to check for matching attributes. Example: 1"),
})

export const ListTicketsFullfilledByUserOutput = z.object({
  fulfilled_ticket_ids: z.array(z.number().int()).optional(),
})

export const listTicketsFullfilledByUser = pikkuSessionlessFunc({
  description: "Returns a list of ticket ids that contain attributes matching the current user's attributes. Accepts a `ticket_ids` parameter for relevant tickets to check for matching attributes.\n\n#### Allowed For\n\n* Agents and admins",
  input: ListTicketsFullfilledByUserInput,
  output: ListTicketsFullfilledByUserOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/routing/requirements/fulfilled", data) as any
  },
})
