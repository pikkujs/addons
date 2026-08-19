import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TweetLikeInput = z.object({
  userId: z.string(),
  tweet_id: z.string().optional(),
})

export const TweetLikeOutput = z.record(z.string(), z.unknown())

export const tweetLike = pikkuSessionlessFunc({
  description: "Like a tweet",
  input: TweetLikeInput,
  output: TweetLikeOutput,
  func: async ({ twitter }, data) => {
    return twitter.call("POST", "/users/{userId}/likes", data) as any
  },
})
