import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminTeamsCreateInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
  team_description: z.string().optional().describe("Description for the team."),
  team_discoverability: z.string().optional().describe("Who can join the team. A team's discoverability can be `open`, `closed`, `invite_only`, or `unlisted`."),
  team_domain: z.string().describe("Team domain (for example, slacksoftballteam)."),
  team_name: z.string().describe("Team name (for example, Slack Softball Team)."),
})

export const AdminTeamsCreateOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminTeamsCreate = pikkuSessionlessFunc({
  description: "Create an Enterprise team.",
  input: AdminTeamsCreateInput,
  output: AdminTeamsCreateOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.teams.create", data) as any
  },
})
