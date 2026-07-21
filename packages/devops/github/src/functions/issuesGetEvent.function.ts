// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const IssuesGetEventInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  event_id: z.number().int(),
})

export const IssuesGetEventOutput = z.any()

export const issuesGetEvent = pikkuSessionlessFunc({
  input: IssuesGetEventInput,
  output: IssuesGetEventOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/issues/events/{event_id}", data) as any
  },
})
