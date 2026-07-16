import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CommentUpdateInput = z.object({
  commentId: z.string(),
  comment_text: z.string().optional(),
  resolved: z.boolean().optional(),
})

export const CommentUpdateOutput = z.record(z.string(), z.unknown())

export const commentUpdate = pikkuSessionlessFunc({
  description: "Comment update",
  input: CommentUpdateInput,
  output: CommentUpdateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("PUT", "/comment/{commentId}", data) as any
  },
})
