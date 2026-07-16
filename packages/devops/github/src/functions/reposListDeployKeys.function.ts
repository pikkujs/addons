// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposListDeployKeysInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposListDeployKeysOutput = z.array(z.object({
  added_by: z.string().nullable().optional(),
  created_at: z.string(),
  id: z.number().int(),
  key: z.string(),
  last_used: z.string().nullable().optional(),
  read_only: z.boolean(),
  title: z.string(),
  url: z.string(),
  verified: z.boolean(),
}))

export const reposListDeployKeys = pikkuSessionlessFunc({
  input: ReposListDeployKeysInput,
  output: ReposListDeployKeysOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/keys", data) as any
  },
})
