import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueCreateInput = z.object({
  teamId: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
})

export const IssueCreateOutput = z.record(z.string(), z.unknown())

export const issueCreate = pikkuSessionlessFunc({
  description: "Create an issue",
  input: IssueCreateInput,
  output: IssueCreateOutput,
  func: async ({ linear }, data) => {
    return linear.call("POST", "/graphql/issue/create", data) as any
  },
})
