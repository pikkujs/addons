// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposListTagsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposListTagsOutput = z.array(z.object({
  commit: z.object({
    sha: z.string(),
    url: z.string().url(),
  }),
  name: z.string(),
  node_id: z.string(),
  tarball_url: z.string().url(),
  zipball_url: z.string().url(),
}))

export const reposListTags = pikkuSessionlessFunc({
  input: ReposListTagsInput,
  output: ReposListTagsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/tags", data) as any
  },
})
