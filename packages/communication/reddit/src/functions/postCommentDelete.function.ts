import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PostCommentDeleteInput = z.object({
  id: z.string().optional(),
})

export const PostCommentDeleteOutput = z.record(z.string(), z.unknown())

export const postCommentDelete = pikkuSessionlessFunc({
  description: "Delete a comment",
  input: PostCommentDeleteInput,
  output: PostCommentDeleteOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("POST", "/api/comment/del", data) as any
  },
})
