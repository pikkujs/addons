// gists — View, modify your gists.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError } from '@pikku/core/errors'

export const GistsListForUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
  since: z.string().datetime().optional().describe("Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const GistsListForUserOutput = z.array(z.object({
  comments: z.number().int(),
  comments_url: z.string().url(),
  commits_url: z.string().url(),
  created_at: z.string().datetime(),
  description: z.string().nullable(),
  files: z.record(z.string(), z.object({
    filename: z.string().optional(),
    language: z.string().optional(),
    raw_url: z.string().optional(),
    size: z.number().int().optional(),
    type: z.string().optional(),
  })),
  forks: z.array(z.unknown()).optional(),
  forks_url: z.string().url(),
  git_pull_url: z.string().url(),
  git_push_url: z.string().url(),
  history: z.array(z.unknown()).optional(),
  html_url: z.string().url(),
  id: z.string(),
  node_id: z.string(),
  owner: z.object({
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
  }).optional().describe("A GitHub user."),
  public: z.boolean(),
  truncated: z.boolean().optional(),
  updated_at: z.string().datetime(),
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

export const gistsListForUser = pikkuSessionlessFunc({
  description: "Lists public gists for the specified user:",
  input: GistsListForUserInput,
  output: GistsListForUserOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/gists", data) as any
  },
})
