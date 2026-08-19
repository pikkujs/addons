import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CommentDeleteInput = z.object({
  commentId: z.string(),
})

export const CommentDeleteOutput = z.record(z.string(), z.unknown())

export const commentDelete = pikkuSessionlessFunc({
  description: "Comment delete",
  input: CommentDeleteInput,
  output: CommentDeleteOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("DELETE", "/comment/{commentId}", data) as any
  },
})
