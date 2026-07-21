import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminUsersSessionInvalidateInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.users:write`"),
  session_id: z.number().int(),
  team_id: z.string().describe("ID of the team that the session belongs to"),
})

export const AdminUsersSessionInvalidateOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersSessionInvalidate = pikkuSessionlessFunc({
  description: "Invalidate a single session for a user by session_id",
  input: AdminUsersSessionInvalidateInput,
  output: AdminUsersSessionInvalidateOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.users.session.invalidate", data) as any
  },
})
