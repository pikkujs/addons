// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const OrgsListMembershipsForAuthenticatedUserInput = z.object({
  state: z.enum(["active", "pending"]).optional().describe("Indicates the state of the memberships to return. If not specified, the API returns both active and pending memberships."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const OrgsListMembershipsForAuthenticatedUserOutput = z.array(z.object({
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
}))

export const orgsListMembershipsForAuthenticatedUser = pikkuSessionlessFunc({
  input: OrgsListMembershipsForAuthenticatedUserInput,
  output: OrgsListMembershipsForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/memberships/orgs", data) as any
  },
})
