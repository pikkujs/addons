import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminTeamsSettingsInfoInput = z.object({
  team_id: z.string(),
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:read`"),
})

export const AdminTeamsSettingsInfoOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsSettingsInfo = pikkuSessionlessFunc({
  description: "Fetch information about settings in a workspace",
  input: AdminTeamsSettingsInfoInput,
  output: AdminTeamsSettingsInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.teams.settings.info", data) as any
  },
})
