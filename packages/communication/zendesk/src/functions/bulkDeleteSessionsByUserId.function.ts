import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BulkDeleteSessionsByUserIdInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const bulkDeleteSessionsByUserId = pikkuSessionlessFunc({
  description: "Deletes all the sessions for a user.\n\n#### Allowed For\n\n* Admins, Agents, End users",
  input: BulkDeleteSessionsByUserIdInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/users/{user_id}/sessions", data)
  },
})
