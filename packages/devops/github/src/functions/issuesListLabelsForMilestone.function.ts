// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssuesListLabelsForMilestoneInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  milestone_number: z.number().int().describe("The number that identifies the milestone."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const IssuesListLabelsForMilestoneOutput = z.array(z.object({
  color: z.string().describe("6-character hex code, without the leading #, identifying the color"),
  default: z.boolean(),
  description: z.string().nullable(),
  id: z.number().int(),
  name: z.string().describe("The name of the label."),
  node_id: z.string(),
  url: z.string().url().describe("URL for the label"),
}))

export const issuesListLabelsForMilestone = pikkuSessionlessFunc({
  input: IssuesListLabelsForMilestoneInput,
  output: IssuesListLabelsForMilestoneOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/milestones/{milestone_number}/labels", data) as any
  },
})
