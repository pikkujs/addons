// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PullsListCommitsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const PullsListCommitsOutput = z.array(z.object({
  author: z.object({
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
  comments_url: z.string().url(),
  commit: z.object({
    author: z.object({
      date: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
    }).nullable().describe("Metaproperties for Git author/committer information."),
    comment_count: z.number().int(),
    committer: z.object({
      date: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
    }).nullable().describe("Metaproperties for Git author/committer information."),
    message: z.string(),
    tree: z.object({
      sha: z.string(),
      url: z.string().url(),
    }),
    url: z.string().url(),
    verification: z.object({
      payload: z.string().nullable(),
      reason: z.string(),
      signature: z.string().nullable(),
      verified: z.boolean(),
    }).optional(),
  }),
  committer: z.object({
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
  files: z.array(z.object({
    additions: z.number().int(),
    blob_url: z.string().url(),
    changes: z.number().int(),
    contents_url: z.string().url(),
    deletions: z.number().int(),
    filename: z.string(),
    patch: z.string().optional(),
    previous_filename: z.string().optional(),
    raw_url: z.string().url(),
    sha: z.string(),
    status: z.enum(["added", "removed", "modified", "renamed", "copied", "changed", "unchanged"]),
  })).optional(),
  html_url: z.string().url(),
  node_id: z.string(),
  parents: z.array(z.object({
    html_url: z.string().url().optional(),
    sha: z.string(),
    url: z.string().url(),
  })),
  sha: z.string(),
  stats: z.object({
    additions: z.number().int().optional(),
    deletions: z.number().int().optional(),
    total: z.number().int().optional(),
  }).optional(),
  url: z.string().url(),
}))

export const pullsListCommits = pikkuSessionlessFunc({
  description: "Lists a maximum of 250 commits for a pull request. To receive a complete commit list for pull requests with more than 250 commits, use the [List commits](https://docs.github.com/rest/reference/repos#list-commits) endpoint.",
  input: PullsListCommitsInput,
  output: PullsListCommitsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pulls/{pull_number}/commits", data) as any
  },
})
