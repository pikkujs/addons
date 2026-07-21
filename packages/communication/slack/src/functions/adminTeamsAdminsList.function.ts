import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminTeamsAdminsListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:read`"),
  limit: z.number().int().optional().describe("The maximum number of items to return."),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."),
  team_id: z.string(),
})

export const AdminTeamsAdminsListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsAdminsList = pikkuSessionlessFunc({
  description: "List all of the admins on a given workspace.",
  input: AdminTeamsAdminsListInput,
  output: AdminTeamsAdminsListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.teams.admins.list", data) as any
  },
})
