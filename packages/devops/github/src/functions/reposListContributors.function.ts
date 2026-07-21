// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ReposListContributorsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  anon: z.string().optional().describe("Set to `1` or `true` to include anonymous contributors in results."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposListContributorsOutput = z.array(z.object({
  avatar_url: z.string().url().optional(),
  contributions: z.number().int(),
  email: z.string().optional(),
  events_url: z.string().optional(),
  followers_url: z.string().url().optional(),
  following_url: z.string().optional(),
  gists_url: z.string().optional(),
  gravatar_id: z.string().nullable().optional(),
  html_url: z.string().url().optional(),
  id: z.number().int().optional(),
  login: z.string().optional(),
  name: z.string().optional(),
  node_id: z.string().optional(),
  organizations_url: z.string().url().optional(),
  received_events_url: z.string().url().optional(),
  repos_url: z.string().url().optional(),
  site_admin: z.boolean().optional(),
  starred_url: z.string().optional(),
  subscriptions_url: z.string().url().optional(),
  type: z.string(),
  url: z.string().url().optional(),
}))

export const reposListContributors = pikkuSessionlessFunc({
  description: "Lists contributors to the specified repository and sorts them by the number of commits per contributor in descending order. This endpoint may return information that is a few hours old because the GitHub REST API caches contributor data to improve performance.\n\nGitHub identifies contributors by author email address. This endpoint groups contribution counts by GitHub user, which includes all associated email addresses. To improve performance, only the first 500 author email addresses in the repository link to GitHub users. The rest will appear as anonymous contributors without associated GitHub user information.",
  input: ReposListContributorsInput,
  output: ReposListContributorsOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/contributors", data) as any
  },
})
