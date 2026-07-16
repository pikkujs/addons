import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IssueCreateCommentInput = z.object({
  projectId: z.string(),
  issueNumber: z.string(),
  body: z.string().optional(),
})

export const IssueCreateCommentOutput = z.record(z.string(), z.unknown())

export const issueCreateComment = pikkuSessionlessFunc({
  description: "Create a comment on an issue",
  input: IssueCreateCommentInput,
  output: IssueCreateCommentOutput,
  func: async ({ gitlab }, data) => {
    return gitlab.call("POST", "/projects/{projectId}/issues/{issueNumber}/notes", data) as any
  },
})
