// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError } from '@pikku/core/errors'

export const TeamsAddOrUpdateProjectPermissionsInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  project_id: z.number().int().describe("The unique identifier of the project."),
  permission: z.enum(["read", "write", "admin"]).optional().describe("The permission to grant to the team for this project. Default: the team's `permission` attribute will be used to determine what permission to grant the team on this project. Note that, if you choose not to pass any parameters, you'll need to set `Content-Length` to zero when calling this endpoint. For more information, see \"[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs).\""),
})

export const teamsAddOrUpdateProjectPermissionsInOrg = pikkuSessionlessFunc({
  description: "Adds an organization project to a team. To add a project to a team or update the team's permission on a project, the authenticated user must have `admin` permissions for the project. The project and team must be part of the same organization.\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `PUT /organizations/{org_id}/team/{team_id}/projects/{project_id}`.",
  input: TeamsAddOrUpdateProjectPermissionsInOrgInput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/teams/{team_slug}/projects/{project_id}", data)
  },
})
