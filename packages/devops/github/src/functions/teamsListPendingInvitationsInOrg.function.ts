// teams — Interact with GitHub Teams.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TeamsListPendingInvitationsInOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  team_slug: z.string().describe("The slug of the team name."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const TeamsListPendingInvitationsInOrgOutput = z.array(z.object({
  created_at: z.string(),
  email: z.string().nullable(),
  failed_at: z.string().nullable().optional(),
  failed_reason: z.string().nullable().optional(),
  id: z.number().int(),
  invitation_source: z.string().optional(),
  invitation_teams_url: z.string(),
  inviter: z.object({
    avatar_url: z.string().url(),
    email: z.string().nullable().optional(),
    events_url: z.string(),
    followers_url: z.string().url(),
    following_url: z.string(),
    gists_url: z.string(),
    gravatar_id: z.string().nullable(),
    html_url: z.string().url(),
    id: z.number().int(),
    login: z.string(),
    name: z.string().nullable().optional(),
    node_id: z.string(),
    organizations_url: z.string().url(),
    received_events_url: z.string().url(),
    repos_url: z.string().url(),
    site_admin: z.boolean(),
    starred_at: z.string().optional(),
    starred_url: z.string(),
    subscriptions_url: z.string().url(),
    type: z.string(),
    url: z.string().url(),
  }).describe("A GitHub user."),
  login: z.string().nullable(),
  node_id: z.string(),
  role: z.string(),
  team_count: z.number().int(),
}))

export const teamsListPendingInvitationsInOrg = pikkuSessionlessFunc({
  description: "The return hash contains a `role` field which refers to the Organization Invitation role and will be one of the following values: `direct_member`, `admin`, `billing_manager`, `hiring_manager`, or `reinstate`. If the invitee is not a GitHub member, the `login` field in the return hash will be `null`.\n\n**Note:** You can also specify a team by `org_id` and `team_id` using the route `GET /organizations/{org_id}/team/{team_id}/invitations`.",
  input: TeamsListPendingInvitationsInOrgInput,
  output: TeamsListPendingInvitationsInOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/teams/{team_slug}/invitations", data) as any
  },
})
