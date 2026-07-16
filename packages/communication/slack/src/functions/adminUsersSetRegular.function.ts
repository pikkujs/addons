import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminUsersSetRegularInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.users:write`"),
  team_id: z.string().describe("The ID (`T1234`) of the workspace."),
  user_id: z.string().describe("The ID of the user to designate as a regular user."),
})

export const AdminUsersSetRegularOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersSetRegular = pikkuSessionlessFunc({
  description: "Set an existing guest user, admin user, or owner to be a regular user.",
  input: AdminUsersSetRegularInput,
  output: AdminUsersSetRegularOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.users.setRegular", data) as any
  },
})
