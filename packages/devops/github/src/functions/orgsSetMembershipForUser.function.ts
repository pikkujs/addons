// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const OrgsSetMembershipForUserInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
  role: z.enum(["admin", "member"]).optional().default("member").describe("The role to give the user in the organization. Can be one of:  \n * `admin` - The user will become an owner of the organization.  \n * `member` - The user will become a non-owner member of the organization."),
})

export const OrgsSetMembershipForUserOutput = z.object({
  organization: z.object({
    avatar_url: z.string(),
    description: z.string().nullable(),
    events_url: z.string().url(),
    hooks_url: z.string(),
    id: z.number().int(),
    issues_url: z.string(),
    login: z.string(),
    members_url: z.string(),
    node_id: z.string(),
    public_members_url: z.string(),
    repos_url: z.string().url(),
    url: z.string().url(),
  }).describe("A GitHub organization."),
  organization_url: z.string().url(),
  permissions: z.object({
    can_create_repository: z.boolean(),
  }).optional(),
  role: z.enum(["admin", "member", "billing_manager"]).describe("The user's membership type in the organization."),
  state: z.enum(["active", "pending"]).describe("The state of the member in the organization. The `pending` state indicates the user has not yet accepted an invitation."),
  url: z.string().url(),
  user: z.object({
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
  }).nullable().describe("A GitHub user."),
}).describe("Org Membership")

export const orgsSetMembershipForUser = pikkuSessionlessFunc({
  description: "Only authenticated organization owners can add a member to the organization or update the member's role.\n\n*   If the authenticated user is _adding_ a member to the organization, the invited user will receive an email inviting them to the organization. The user's [membership status](https://docs.github.com/rest/reference/orgs#get-organization-membership-for-a-user) will be `pending` until they accept the invitation.\n    \n*   Authenticated users can _update_ a user's membership by passing the `role` parameter. If the authenticated user changes a member's role to `admin`, the affected user will receive an email notifying them that they've been made an organization owner. If the authenticated user changes an owner's role to `member`, no email will be sent.\n\n**Rate limits**\n\nTo prevent abuse, the authenticated user is limited to 50 organization invitations per 24 hour period. If the organization is more than one month old or on a paid plan, the limit is 500 invitations per 24 hour period.",
  input: OrgsSetMembershipForUserInput,
  output: OrgsSetMembershipForUserOutput,
  errors: [ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/orgs/{org}/memberships/{username}", data) as any
  },
})
