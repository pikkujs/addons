// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const IssuesGetLabelInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  name: z.string(),
})

export const IssuesGetLabelOutput = z.object({
  color: z.string().describe("6-character hex code, without the leading #, identifying the color"),
  default: z.boolean(),
  description: z.string().nullable(),
  id: z.number().int(),
  name: z.string().describe("The name of the label."),
  node_id: z.string(),
  url: z.string().url().describe("URL for the label"),
}).describe("Color-coded labels help you categorize and filter your issues (just like labels in Gmail).")

export const issuesGetLabel = pikkuSessionlessFunc({
  input: IssuesGetLabelInput,
  output: IssuesGetLabelOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/labels/{name}", data) as any
  },
})
