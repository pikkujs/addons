import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssueGetInput = z.object({
  projectId: z.string(),
  issueNumber: z.string(),
})

export const IssueGetOutput = z.record(z.string(), z.unknown())

export const issueGet = pikkuSessionlessFunc({
  description: "Get an issue",
  input: IssueGetInput,
  output: IssueGetOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("GET", "/projects/{projectId}/issues/{issueNumber}", data) as any
  },
})
