import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueDeleteInput = z.object({
  id: z.string(),
})

export const IssueDeleteOutput = z.record(z.string(), z.unknown())

export const issueDelete = pikkuSessionlessFunc({
  description: "IssueDelete",
  input: IssueDeleteInput,
  output: IssueDeleteOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("DELETE", "/issues/{id}", data) as any
  },
})
