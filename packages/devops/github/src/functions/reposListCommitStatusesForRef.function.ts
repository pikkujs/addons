// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposListCommitStatusesForRefInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ref: z.string().describe("ref parameter"),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposListCommitStatusesForRefOutput = z.array(z.object({
  avatar_url: z.string().nullable(),
  context: z.string(),
  created_at: z.string(),
  creator: z.object({
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
  description: z.string().nullable(),
  id: z.number().int(),
  node_id: z.string(),
  state: z.string(),
  target_url: z.string().nullable(),
  updated_at: z.string(),
  url: z.string(),
}))

export const reposListCommitStatusesForRef = pikkuSessionlessFunc({
  description: "Users with pull access in a repository can view commit statuses for a given ref. The ref can be a SHA, a branch name, or a tag name. Statuses are returned in reverse chronological order. The first status in the list will be the latest one.\n\nThis resource is also available via a legacy route: `GET /repos/:owner/:repo/statuses/:ref`.",
  input: ReposListCommitStatusesForRefInput,
  output: ReposListCommitStatusesForRefOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/commits/{ref}/statuses", data) as any
  },
})
