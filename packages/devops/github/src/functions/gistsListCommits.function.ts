// gists — View, modify your gists.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GistsListCommitsInput = z.object({
  gist_id: z.string().describe("The unique identifier of the gist."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const GistsListCommitsOutput = z.array(z.object({
  change_status: z.object({
    additions: z.number().int().optional(),
    deletions: z.number().int().optional(),
    total: z.number().int().optional(),
  }),
  committed_at: z.string().datetime(),
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
  version: z.string(),
}))

export const gistsListCommits = pikkuSessionlessFunc({
  input: GistsListCommitsInput,
  output: GistsListCommitsOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/gists/{gist_id}/commits", data) as any
  },
})
