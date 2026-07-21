import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminTeamsListInput = z.object({
  limit: z.number().int().optional().describe("The maximum number of items to return. Must be between 1 - 100 both inclusive."),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."),
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:read`"),
})

export const AdminTeamsListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsList = pikkuSessionlessFunc({
  description: "List all teams on an Enterprise organization",
  input: AdminTeamsListInput,
  output: AdminTeamsListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.teams.list", data) as any
  },
})
