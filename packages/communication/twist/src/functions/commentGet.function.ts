import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CommentGetInput = z.object({
  id: z.string(),
})

export const CommentGetOutput = z.record(z.string(), z.unknown())

export const commentGet = pikkuSessionlessFunc({
  description: "Get a comment",
  input: CommentGetInput,
  output: CommentGetOutput,
  func: async ({ twist }, data) => {
    return twist.call("GET", "/comments/getone", data) as any
  },
})
