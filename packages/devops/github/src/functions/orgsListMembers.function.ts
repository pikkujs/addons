// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const OrgsListMembersInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  filter: z.enum(["2fa_disabled", "all"]).optional().default("all").describe("Filter members returned in the list. `2fa_disabled` means that only members without [two-factor authentication](https://github.com/blog/1614-two-factor-authentication) enabled will be returned. This options is only available for organization owners."),
  role: z.enum(["all", "admin", "member"]).optional().default("all").describe("Filter members returned by their role."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const OrgsListMembersOutput = z.array(z.object({
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
}))

export const orgsListMembers = pikkuSessionlessFunc({
  description: "List all users who are members of an organization. If the authenticated user is also a member of this organization then both concealed and public members will be returned.",
  input: OrgsListMembersInput,
  output: OrgsListMembersOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/members", data) as any
  },
})
