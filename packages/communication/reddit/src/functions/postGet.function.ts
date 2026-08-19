import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PostGetInput = z.object({
  subreddit: z.string(),
  postId: z.string(),
})

export const PostGetOutput = z.record(z.string(), z.unknown())

export const postGet = pikkuSessionlessFunc({
  description: "Get a post",
  input: PostGetInput,
  output: PostGetOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("GET", "/r/{subreddit}/comments/{postId}", data) as any
  },
})
