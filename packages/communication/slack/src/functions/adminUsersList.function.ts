import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminUsersListInput = z.object({
  team_id: z.string().describe("The ID (`T1234`) of the workspace."),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."),
  limit: z.number().int().optional().describe("Limit for how many users to be retrieved per page"),
  token: z.string().describe("Authentication token. Requires scope: `admin.users:read`"),
})

export const AdminUsersListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsersList = pikkuSessionlessFunc({
  description: "List users on a workspace",
  input: AdminUsersListInput,
  output: AdminUsersListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.users.list", data) as any
  },
})
