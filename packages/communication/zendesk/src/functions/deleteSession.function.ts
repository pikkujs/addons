import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteSessionInput = z.object({
  session_id: z.number().int().describe("The ID of the session. Example: 14"),
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const deleteSession = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins, Agents, End users",
  input: DeleteSessionInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/users/{user_id}/sessions/{session_id}", data)
  },
})
