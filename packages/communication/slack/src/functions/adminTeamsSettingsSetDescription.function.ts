import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminTeamsSettingsSetDescriptionInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
  description: z.string().describe("The new description for the workspace."),
  team_id: z.string().describe("ID for the workspace to set the description for."),
})

export const AdminTeamsSettingsSetDescriptionOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsSettingsSetDescription = pikkuSessionlessFunc({
  description: "Set the description of a given workspace.",
  input: AdminTeamsSettingsSetDescriptionInput,
  output: AdminTeamsSettingsSetDescriptionOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.teams.settings.setDescription", data) as any
  },
})
