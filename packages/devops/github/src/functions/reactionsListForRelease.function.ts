// reactions — Interact with reactions to various GitHub entities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ReactionsListForReleaseInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  release_id: z.number().int().describe("The unique identifier of the release."),
  content: z.enum(["+1", "laugh", "heart", "hooray", "rocket", "eyes"]).optional().describe("Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to a release."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReactionsListForReleaseOutput = z.array(z.object({
  content: z.enum(["+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"]).describe("The reaction to use"),
  created_at: z.string().datetime(),
  id: z.number().int(),
  node_id: z.string(),
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

export const reactionsListForRelease = pikkuSessionlessFunc({
  description: "List the reactions to a [release](https://docs.github.com/rest/reference/repos#releases).",
  input: ReactionsListForReleaseInput,
  output: ReactionsListForReleaseOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/releases/{release_id}/reactions", data) as any
  },
})
