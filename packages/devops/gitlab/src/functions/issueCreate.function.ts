import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssueCreateInput = z.object({
  projectId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  due_date: z.string().optional(),
  labels: z.string().optional(),
})

export const IssueCreateOutput = z.record(z.string(), z.unknown())

export const issueCreate = pikkuSessionlessFunc({
  description: "Create an issue",
  input: IssueCreateInput,
  output: IssueCreateOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("POST", "/projects/{projectId}/issues", data) as any
  },
})
