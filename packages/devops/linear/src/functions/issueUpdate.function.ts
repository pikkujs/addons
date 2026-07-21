import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueUpdateInput = z.object({
  issueId: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
})

export const IssueUpdateOutput = z.record(z.string(), z.unknown())

export const issueUpdate = pikkuSessionlessFunc({
  description: "Update an issue",
  input: IssueUpdateInput,
  output: IssueUpdateOutput,
  func: async ({ linear }, data) => {
    return linear.call("POST", "/graphql/issue/update", data) as any
  },
})
