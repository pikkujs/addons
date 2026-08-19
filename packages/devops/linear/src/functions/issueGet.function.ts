import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssueGetInput = z.object({
  issueId: z.string().optional(),
})

export const IssueGetOutput = z.record(z.string(), z.unknown())

export const issueGet = pikkuSessionlessFunc({
  description: "Get an issue",
  input: IssueGetInput,
  output: IssueGetOutput,
  func: async ({ linear }, data) => {
    return linear.call("POST", "/graphql/issue/get", data) as any
  },
})
