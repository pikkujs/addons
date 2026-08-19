import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PostCommentGetAllInput = z.object({
  subreddit: z.string(),
  postId: z.string(),
})

export const PostCommentGetAllOutput = z.record(z.string(), z.unknown())

export const postCommentGetAll = pikkuSessionlessFunc({
  description: "Get all comments on a post",
  input: PostCommentGetAllInput,
  output: PostCommentGetAllOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("GET", "/r/{subreddit}/comments/{postId}/comments", data) as any
  },
})
