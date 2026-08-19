// gists — View, modify your gists.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const GistsForkInput = z.object({
  gist_id: z.string().describe("The unique identifier of the gist."),
})

export const GistsForkOutput = z.object({
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
}).describe("Base Gist")

export const gistsFork = pikkuSessionlessFunc({
  input: GistsForkInput,
  output: GistsForkOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/gists/{gist_id}/forks", data) as any
  },
})
