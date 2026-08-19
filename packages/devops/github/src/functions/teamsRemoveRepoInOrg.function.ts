// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamsRemoveRepoInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const teamsRemoveRepoInOrg = pikkuSessionlessFunc({
  description: "If the authenticated user is an organization owner or a team maintainer, they can remove any repositories from the team. To remove a repository from a team as an organization member, the authenticated user must have admin access to the repository and must be able to see the team. This does not delete the repository, it just removes it from the team.\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}/repos/{owner}/{repo}`.",
  input: TeamsRemoveRepoInOrgInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}", data)
  },
})
