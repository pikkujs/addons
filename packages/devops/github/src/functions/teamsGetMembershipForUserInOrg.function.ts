// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const TeamsGetMembershipForUserInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const TeamsGetMembershipForUserInOrgOutput = z.object({
  role: z.enum(["member", "maintainer"]).default("member").describe("The role of the user in the team."),
  state: z.enum(["active", "pending"]).describe("The state of the user's membership in the team."),
  url: z.string().url(),
}).describe("Team Membership")

export const teamsGetMembershipForUserInOrg = pikkuSessionlessFunc({
  description: "Team members will include the members of child teams.\n\nTo get a user's membership with a team, the team must be visible to the authenticated user.\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/memberships/{username}`.\n\n**Note:**\nThe response contains the `state` of the membership and the member's `role`.\n\nThe `role` for organization owners is set to `maintainer`. For more information about `maintainer` roles, see see [Create a team](https://docs.github.com/rest/reference/teams#create-a-team).",
  input: TeamsGetMembershipForUserInOrgInput,
  output: TeamsGetMembershipForUserInOrgOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/teams/{team_slug}/memberships/{username}", data) as any
  },
})
