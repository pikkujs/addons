import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CommentDeleteInput = z.object({
  id: z.string(),
})

export const CommentDeleteOutput = z.record(z.string(), z.unknown())

export const commentDelete = pikkuSessionlessFunc({
  description: "Remove a comment",
  input: CommentDeleteInput,
  output: CommentDeleteOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/comments/remove", data) as any
  },
})
