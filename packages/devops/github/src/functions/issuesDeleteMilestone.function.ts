// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const IssuesDeleteMilestoneInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  milestone_number: z.number().int().describe("The number that identifies the milestone."),
})

export const issuesDeleteMilestone = pikkuSessionlessFunc({
  input: IssuesDeleteMilestoneInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/milestones/{milestone_number}", data)
  },
})
