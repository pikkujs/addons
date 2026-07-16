import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostCommentCreateInput = z.object({
  text: z.string().optional(),
  thing_id: z.string().optional(),
})

export const PostCommentCreateOutput = z.record(z.string(), z.unknown())

export const postCommentCreate = pikkuSessionlessFunc({
  description: "Create a comment on a post",
  input: PostCommentCreateInput,
  output: PostCommentCreateOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("POST", "/api/comment", data) as any
  },
})
