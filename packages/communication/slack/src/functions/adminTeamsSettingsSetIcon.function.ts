import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminTeamsSettingsSetIconInput = z.object({
  image_url: z.string().describe("Image URL for the icon"),
  team_id: z.string().describe("ID for the workspace to set the icon for."),
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
})

export const AdminTeamsSettingsSetIconOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsSettingsSetIcon = pikkuSessionlessFunc({
  description: "Sets the icon of a workspace.",
  input: AdminTeamsSettingsSetIconInput,
  output: AdminTeamsSettingsSetIconOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.teams.settings.setIcon", data) as any
  },
})
