// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const OrgsCreateInvitationInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  email: z.string().optional().describe("**Required unless you provide `invitee_id`**. Email address of the person you are inviting, which can be an existing GitHub user."),
  invitee_id: z.number().int().optional().describe("**Required unless you provide `email`**. GitHub user ID for the person you are inviting."),
  role: z.enum(["admin", "direct_member", "billing_manager"]).optional().default("direct_member").describe("The role for the new member. \n * `admin` - Organization owners with full administrative rights to the organization and complete access to all repositories and teams.  \n * `direct_member` - Non-owner organization members with ability to see other members and join teams by invitation.  \n * `billing_manager` - Non-owner organization members with ability to manage the billing settings of your organization."),
  team_ids: z.array(z.number().int()).optional().describe("Specify IDs for the teams you want to invite new members to."),
})

export const OrgsCreateInvitationOutput = z.object({
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
}).describe("Organization Invitation")

export const orgsCreateInvitation = pikkuSessionlessFunc({
  description: "Invite people to an organization by using their GitHub user ID or their email address. In order to create invitations in an organization, the authenticated user must be an organization owner.\n\nThis endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. See \"[Secondary rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#secondary-rate-limits)\" and \"[Dealing with secondary rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-secondary-rate-limits)\" for details.",
  input: OrgsCreateInvitationInput,
  output: OrgsCreateInvitationOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/orgs/{org}/invitations", data) as any
  },
})
