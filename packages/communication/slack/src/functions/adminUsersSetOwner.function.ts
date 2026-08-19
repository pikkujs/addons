import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminUsersSetOwnerInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.users:write`"),
  team_id: z.string().describe("The ID (`T1234`) of the workspace."),
  user_id: z.string().describe("Id of the user to promote to owner."),
})

export const AdminUsersSetOwnerOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersSetOwner = pikkuSessionlessFunc({
  description: "Set an existing guest, regular user, or admin user to be a workspace owner.",
  input: AdminUsersSetOwnerInput,
  output: AdminUsersSetOwnerOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.users.setOwner", data) as any
  },
})
