// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnprocessableContentError, InternalServerError } from '@pikku/core/errors'

export const PullsListFilesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const PullsListFilesOutput = z.array(z.object({
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
}))

export const pullsListFiles = pikkuSessionlessFunc({
  description: "**Note:** Responses include a maximum of 3000 files. The paginated response returns 30 files per page by default.",
  input: PullsListFilesInput,
  output: PullsListFilesOutput,
  errors: [UnprocessableContentError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/pulls/{pull_number}/files", data) as any
  },
})
