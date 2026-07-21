import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostCommentReplyInput = z.object({
  text: z.string().optional(),
  thing_id: z.string().optional(),
})

export const PostCommentReplyOutput = z.record(z.string(), z.unknown())

export const postCommentReply = pikkuSessionlessFunc({
  description: "Reply to a comment",
  input: PostCommentReplyInput,
  output: PostCommentReplyOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("POST", "/api/comment/reply", data) as any
  },
})
