import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminUsersSetAdminInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.users:write`"),
  team_id: z.string().describe("The ID (`T1234`) of the workspace."),
  user_id: z.string().describe("The ID of the user to designate as an admin."),
})

export const AdminUsersSetAdminOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersSetAdmin = pikkuSessionlessFunc({
  description: "Set an existing guest, regular user, or owner to be an admin user.",
  input: AdminUsersSetAdminInput,
  output: AdminUsersSetAdminOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.users.setAdmin", data) as any
  },
})
