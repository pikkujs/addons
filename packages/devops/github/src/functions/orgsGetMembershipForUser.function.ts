// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const OrgsGetMembershipForUserInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const OrgsGetMembershipForUserOutput = z.object({
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

export const orgsGetMembershipForUser = pikkuSessionlessFunc({
  description: "In order to get a user's membership with an organization, the authenticated user must be an organization member. The `state` parameter in the response can be used to identify the user's membership status.",
  input: OrgsGetMembershipForUserInput,
  output: OrgsGetMembershipForUserOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/memberships/{username}", data) as any
  },
})
