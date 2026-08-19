import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssueCreateInput = z.object({
  project: z.string().optional(),
  subject: z.string().optional(),
})

export const IssueCreateOutput = z.record(z.string(), z.unknown())

export const issueCreate = pikkuSessionlessFunc({
  description: "IssueCreate",
  input: IssueCreateInput,
  output: IssueCreateOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("POST", "/issues", data) as any
  },
})
