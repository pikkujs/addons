import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminTeamsSettingsSetDiscoverabilityInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
  discoverability: z.string().describe("This workspace's discovery setting. It must be set to one of `open`, `invite_only`, `closed`, or `unlisted`."),
  team_id: z.string().describe("The ID of the workspace to set discoverability on."),
})

export const AdminTeamsSettingsSetDiscoverabilityOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsSettingsSetDiscoverability = pikkuSessionlessFunc({
  description: "An API method that allows admins to set the discoverability of a given workspace",
  input: AdminTeamsSettingsSetDiscoverabilityInput,
  output: AdminTeamsSettingsSetDiscoverabilityOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.teams.settings.setDiscoverability", data) as any
  },
})
