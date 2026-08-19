import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminUsergroupsAddTeamsInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
  auto_provision: z.boolean().optional().describe("When `true`, this method automatically creates new workspace accounts for the IDP group members."),
  team_ids: z.string().describe("A comma separated list of encoded team (workspace) IDs. Each workspace *MUST* belong to the organization associated with the token."),
  usergroup_id: z.string().describe("An encoded usergroup (IDP Group) ID."),
})

export const AdminUsergroupsAddTeamsOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminUsergroupsAddTeams = pikkuSessionlessFunc({
  description: "Associate one or more default workspaces with an organization-wide IDP group.",
  input: AdminUsergroupsAddTeamsInput,
  output: AdminUsergroupsAddTeamsOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.usergroups.addTeams", data) as any
  },
})
