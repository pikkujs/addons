import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TweetCreateInput = z.object({
  text: z.string().optional(),
})

export const TweetCreateOutput = z.record(z.string(), z.unknown())

export const tweetCreate = pikkuSessionlessFunc({
  description: "Create a tweet",
  input: TweetCreateInput,
  output: TweetCreateOutput,
  func: async ({ twitter }, data) => {
    return twitter.call("POST", "/tweets", data) as any
  },
})
