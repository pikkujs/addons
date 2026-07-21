import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CommentUpdateInput = z.object({
  id: z.string().optional(),
  content: z.string().optional(),
})

export const CommentUpdateOutput = z.record(z.string(), z.unknown())

export const commentUpdate = pikkuSessionlessFunc({
  description: "Update a comment",
  input: CommentUpdateInput,
  output: CommentUpdateOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/comments/update", data) as any
  },
})
