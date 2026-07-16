import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TweetDeleteInput = z.object({
  tweetId: z.string(),
})

export const TweetDeleteOutput = z.record(z.string(), z.unknown())

export const tweetDelete = pikkuSessionlessFunc({
  description: "Delete a tweet",
  input: TweetDeleteInput,
  output: TweetDeleteOutput,
  func: async ({ twitter }, data) => {
    return twitter.call("DELETE", "/tweets/{tweetId}", data) as any
  },
})
