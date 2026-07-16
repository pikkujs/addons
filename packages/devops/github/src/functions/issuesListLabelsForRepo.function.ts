// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const IssuesListLabelsForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const IssuesListLabelsForRepoOutput = z.array(z.object({
  color: z.string().describe("6-character hex code, without the leading #, identifying the color"),
  default: z.boolean(),
  description: z.string().nullable(),
  id: z.number().int(),
  name: z.string().describe("The name of the label."),
  node_id: z.string(),
  url: z.string().url().describe("URL for the label"),
}))

export const issuesListLabelsForRepo = pikkuSessionlessFunc({
  input: IssuesListLabelsForRepoInput,
  output: IssuesListLabelsForRepoOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/labels", data) as any
  },
})
