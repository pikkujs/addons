import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueGetInput = z.object({
  id: z.string(),
})

export const IssueGetOutput = z.record(z.string(), z.unknown())

export const issueGet = pikkuSessionlessFunc({
  description: "IssueGet",
  input: IssueGetInput,
  output: IssueGetOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("GET", "/issues/{id}", data) as any
  },
})
