import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssueGetAllInput = z.object({
  returnAll: z.boolean().optional(),
  limit: z.number().int().optional(),
})

export const IssueGetAllOutput = z.record(z.string(), z.unknown())

export const issueGetAll = pikkuSessionlessFunc({
  description: "Get many issues",
  input: IssueGetAllInput,
  output: IssueGetAllOutput,
  func: async ({ linear }, data) => {
    return linear.call("POST", "/graphql/issue/getAll", data) as any
  },
})
