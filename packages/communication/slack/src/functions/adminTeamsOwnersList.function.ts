import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminTeamsOwnersListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:read`"),
  team_id: z.string(),
  limit: z.number().int().optional().describe("The maximum number of items to return. Must be between 1 - 1000 both inclusive."),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page."),
})

export const AdminTeamsOwnersListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsOwnersList = pikkuSessionlessFunc({
  description: "List all of the owners on a given workspace.",
  input: AdminTeamsOwnersListInput,
  output: AdminTeamsOwnersListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.teams.owners.list", data) as any
  },
})
