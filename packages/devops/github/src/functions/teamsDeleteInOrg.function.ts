// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamsDeleteInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
})

export const teamsDeleteInOrg = pikkuSessionlessFunc({
  description: "To delete a team, the authenticated user must be an organization owner or team maintainer.\n\nIf you are an organization owner, deleting a parent team will delete all of its child teams as well.\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}`.",
  input: TeamsDeleteInOrgInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/teams/{team_slug}", data)
  },
})
