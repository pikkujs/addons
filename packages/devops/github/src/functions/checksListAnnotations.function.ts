// checks — Rich interactions with checks run by your integrations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChecksListAnnotationsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  check_run_id: z.number().int().describe("The unique identifier of the check run."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ChecksListAnnotationsOutput = z.array(z.object({
  annotation_level: z.string().nullable(),
  blob_href: z.string(),
  end_column: z.number().int().nullable(),
  end_line: z.number().int(),
  message: z.string().nullable(),
  path: z.string(),
  raw_details: z.string().nullable(),
  start_column: z.number().int().nullable(),
  start_line: z.number().int(),
  title: z.string().nullable(),
}))

export const checksListAnnotations = pikkuSessionlessFunc({
  description: "Lists annotations for a check run using the annotation `id`. GitHub Apps must have the `checks:read` permission on a private repository or pull access to a public repository to get annotations for a check run. OAuth Apps and authenticated users must have the `repo` scope to get annotations for a check run in a private repository.",
  input: ChecksListAnnotationsInput,
  output: ChecksListAnnotationsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations", data) as any
  },
})
