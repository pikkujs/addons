// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposGetLatestPagesBuildInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposGetLatestPagesBuildOutput = z.object({
  commit: z.string(),
  created_at: z.string().datetime(),
  duration: z.number().int(),
  error: z.object({
    message: z.string().nullable(),
  }),
  pusher: z.object({
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
  status: z.string(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("Page Build")

export const reposGetLatestPagesBuild = pikkuSessionlessFunc({
  input: ReposGetLatestPagesBuildInput,
  output: ReposGetLatestPagesBuildOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pages/builds/latest", data) as any
  },
})
