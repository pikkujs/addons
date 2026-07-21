import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminTeamsSettingsSetDefaultChannelsInput = z.object({
  channel_ids: z.string().describe("An array of channel IDs."),
  team_id: z.string().describe("ID for the workspace to set the default channel for."),
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
})

export const AdminTeamsSettingsSetDefaultChannelsOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsSettingsSetDefaultChannels = pikkuSessionlessFunc({
  description: "Set the default channels of a workspace.",
  input: AdminTeamsSettingsSetDefaultChannelsInput,
  output: AdminTeamsSettingsSetDefaultChannelsOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.teams.settings.setDefaultChannels", data) as any
  },
})
