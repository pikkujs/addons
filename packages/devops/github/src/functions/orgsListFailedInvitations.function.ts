// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const OrgsListFailedInvitationsInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const OrgsListFailedInvitationsOutput = z.array(z.object({
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

export const orgsListFailedInvitations = pikkuSessionlessFunc({
  description: "The return hash contains `failed_at` and `failed_reason` fields which represent the time at which the invitation failed and the reason for the failure.",
  input: OrgsListFailedInvitationsInput,
  output: OrgsListFailedInvitationsOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/failed_invitations", data) as any
  },
})
