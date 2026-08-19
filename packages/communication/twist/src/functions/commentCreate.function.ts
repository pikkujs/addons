import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CommentCreateInput = z.object({
  thread_id: z.string().optional(),
  content: z.string().optional(),
})

export const CommentCreateOutput = z.record(z.string(), z.unknown())

export const commentCreate = pikkuSessionlessFunc({
  description: "Add a comment",
  input: CommentCreateInput,
  output: CommentCreateOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/comments/add", data) as any
  },
})
