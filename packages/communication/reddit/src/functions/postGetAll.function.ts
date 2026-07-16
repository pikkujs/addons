import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostGetAllInput = z.object({
  subreddit: z.string(),
  category: z.string().optional(),
  limit: z.number().int().optional(),
})

export const PostGetAllOutput = z.record(z.string(), z.unknown())

export const postGetAll = pikkuSessionlessFunc({
  description: "Get all posts in a subreddit",
  input: PostGetAllInput,
  output: PostGetAllOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("GET", "/r/{subreddit}", data) as any
  },
})
