import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssueDeleteInput = z.object({
  issueId: z.string().optional(),
})

export const IssueDeleteOutput = z.record(z.string(), z.unknown())

export const issueDelete = pikkuSessionlessFunc({
  description: "Delete an issue",
  input: IssueDeleteInput,
  output: IssueDeleteOutput,
  func: async ({ linear }, data) => {
    return linear.call("POST", "/graphql/issue/delete", data) as any
  },
})
