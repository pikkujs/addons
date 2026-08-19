import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CommentGetAllInput = z.object({
  thread_id: z.string(),
})

export const CommentGetAllOutput = z.record(z.string(), z.unknown())

export const commentGetAll = pikkuSessionlessFunc({
  description: "Get all comments",
  input: CommentGetAllInput,
  output: CommentGetAllOutput,
  func: async ({ twist }, data) => {
    return twist.call("GET", "/comments/get", data) as any
  },
})
