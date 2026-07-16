// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamsRemoveProjectInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  project_id: z.number().int().describe("The unique identifier of the project."),
})

export const teamsRemoveProjectInOrg = pikkuSessionlessFunc({
  description: "Removes an organization project from a team. An organization owner or a team maintainer can remove any project from the team. To remove a project from a team as an organization member, the authenticated user must have `read` access to both the team and project, or `admin` access to the team or project. This endpoint removes the project from the team, but does not delete the project.\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `DELETE /organizations/{org_id}/team/{team_id}/projects/{project_id}`.",
  input: TeamsRemoveProjectInOrgInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/teams/{team_slug}/projects/{project_id}", data)
  },
})
