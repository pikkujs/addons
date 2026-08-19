import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssueGetAllInput = z.object({
  project: z.string().optional(),
})

export const IssueGetAllOutput = z.record(z.string(), z.unknown())

export const issueGetAll = pikkuSessionlessFunc({
  description: "IssueGetAll",
  input: IssueGetAllInput,
  output: IssueGetAllOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("GET", "/issues", data) as any
  },
})
