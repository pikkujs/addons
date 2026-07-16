import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubredditGetInput = z.object({
  subreddit: z.string(),
  content: z.string().optional(),
})

export const SubredditGetOutput = z.record(z.string(), z.unknown())

export const subredditGet = pikkuSessionlessFunc({
  description: "Get information about a subreddit",
  input: SubredditGetInput,
  output: SubredditGetOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("GET", "/r/{subreddit}/about", data) as any
  },
})
