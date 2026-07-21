import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CaseAddCommentInput = z.object({
  caseId: z.string().optional(),
  commentBody: z.string().optional(),
})

export const CaseAddCommentOutput = z.record(z.string(), z.unknown())

export const caseAddComment = pikkuSessionlessFunc({
  description: "Add comment to case",
  input: CaseAddCommentInput,
  output: CaseAddCommentOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("POST", "/sobjects/Case/comments", data) as any
  },
})
