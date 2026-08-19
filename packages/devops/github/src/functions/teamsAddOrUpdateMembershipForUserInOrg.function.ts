// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const TeamsAddOrUpdateMembershipForUserInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  username: z.string().describe("The handle for the GitHub user account."),
  role: z.enum(["member", "maintainer"]).optional().default("member").describe("The role that this user should have in the team."),
})

export const TeamsAddOrUpdateMembershipForUserInOrgOutput = z.object({
  role: z.enum(["member", "maintainer"]).default("member").describe("The role of the user in the team."),
  state: z.enum(["active", "pending"]).describe("The state of the user's membership in the team."),
  url: z.string().url(),
}).describe("Team Membership")

export const teamsAddOrUpdateMembershipForUserInOrg = pikkuSessionlessFunc({
  description: "Adds an organization member to a team. An authenticated organization owner or team maintainer can add organization members to a team.\n\nTeam synchronization is available for organizations using GitHub Enterprise Cloud. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.\n\n**Note:** When you have team synchronization set up for a team with your organization's identity provider (IdP), you will see an error if you attempt to use the API for making changes to the team's membership. If you have access to manage group membership in your IdP, you can manage GitHub team membership through your identity provider, which automatically adds and removes team members in an organization. For more information, see \"[Synchronizing teams between your identity provider and GitHub](https://docs.github.com/articles/synchronizing-teams-between-your-identity-provider-and-github/).\"\n\nAn organization owner can add someone who is not part of the team's organization to a team. When an organization owner adds someone to a team who is not an organization member, this endpoint will send an invitation to the person via email. This newly-created membership will be in the \"pending\" state until the person accepts the invitation, at which point the membership will transition to the \"active\" state and the user will be added as a member of the team.\n\nIf the user is already a member of the team, this endpoint will update the role of the team member's role. To update the membership of a team member, the authenticated user must be an organization owner or a team maintainer.\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `PUT /organizations/{org_id}/team/{team_id}/memberships/{username}`.",
  input: TeamsAddOrUpdateMembershipForUserInOrgInput,
  output: TeamsAddOrUpdateMembershipForUserInOrgOutput,
  errors: [ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/teams/{team_slug}/memberships/{username}", data) as any
  },
})
