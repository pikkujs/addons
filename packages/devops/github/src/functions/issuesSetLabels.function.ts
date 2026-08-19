// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const IssuesSetLabelsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  issue_number: z.number().int().describe("The number that identifies the issue."),
  body: z.union([z.object({
  labels: z.array(z.string()).min(1).optional().describe("The names of the labels to set for the issue. The labels you set replace any existing labels. You can pass an empty array to remove all labels. Alternatively, you can pass a single label as a `string` or an `array` of labels directly, but GitHub recommends passing an object with the `labels` key. You can also add labels to the existing labels for an issue. For more information, see \"[Add labels to an issue](https://docs.github.com/rest/reference/issues#add-labels-to-an-issue).\""),
}), z.array(z.string()), z.object({
  labels: z.array(z.object({
    name: z.string(),
  })).min(1).optional(),
}), z.array(z.object({
  name: z.string(),
})), z.string()]),
})

export const IssuesSetLabelsOutput = z.array(z.object({
  color: z.string().describe("6-character hex code, without the leading #, identifying the color"),
  default: z.boolean(),
  description: z.string().nullable(),
  id: z.number().int(),
  name: z.string().describe("The name of the label."),
  node_id: z.string(),
  url: z.string().url().describe("URL for the label"),
}))

export const issuesSetLabels = pikkuSessionlessFunc({
  description: "Removes any previous labels and sets the new labels for an issue.",
  input: IssuesSetLabelsInput,
  output: IssuesSetLabelsOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/issues/{issue_number}/labels", data) as any
  },
})
