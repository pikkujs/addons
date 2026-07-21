import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueUpdateInput = z.object({
  id: z.string(),
  subject: z.string().optional(),
})

export const IssueUpdateOutput = z.record(z.string(), z.unknown())

export const issueUpdate = pikkuSessionlessFunc({
  description: "IssueUpdate",
  input: IssueUpdateInput,
  output: IssueUpdateOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("PATCH", "/issues/{id}", data) as any
  },
})
