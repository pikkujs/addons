import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueEditInput = z.object({
  projectId: z.string(),
  issueNumber: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  state_event: z.string().optional(),
  labels: z.string().optional(),
})

export const IssueEditOutput = z.record(z.string(), z.unknown())

export const issueEdit = pikkuSessionlessFunc({
  description: "Edit an issue",
  input: IssueEditInput,
  output: IssueEditOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("PUT", "/projects/{projectId}/issues/{issueNumber}", data) as any
  },
})
