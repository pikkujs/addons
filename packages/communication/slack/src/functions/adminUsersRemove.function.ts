import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminUsersRemoveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.users:write`"),
  team_id: z.string().describe("The ID (`T1234`) of the workspace."),
  user_id: z.string().describe("The ID of the user to remove."),
})

export const AdminUsersRemoveOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersRemove = pikkuSessionlessFunc({
  description: "Remove a user from a workspace.",
  input: AdminUsersRemoveInput,
  output: AdminUsersRemoveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.users.remove", data) as any
  },
})
