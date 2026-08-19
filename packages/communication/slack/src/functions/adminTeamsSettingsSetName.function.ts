import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminTeamsSettingsSetNameInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
  name: z.string().describe("The new name of the workspace."),
  team_id: z.string().describe("ID for the workspace to set the name for."),
})

export const AdminTeamsSettingsSetNameOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsSettingsSetName = pikkuSessionlessFunc({
  description: "Set the name of a given workspace.",
  input: AdminTeamsSettingsSetNameInput,
  output: AdminTeamsSettingsSetNameOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.teams.settings.setName", data) as any
  },
})
