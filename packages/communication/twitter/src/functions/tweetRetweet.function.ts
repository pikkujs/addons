import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TweetRetweetInput = z.object({
  userId: z.string(),
  tweet_id: z.string().optional(),
})

export const TweetRetweetOutput = z.record(z.string(), z.unknown())

export const tweetRetweet = pikkuSessionlessFunc({
  description: "Retweet a tweet",
  input: TweetRetweetInput,
  output: TweetRetweetOutput,
  func: async ({ twitter }, data) => {
    return twitter.call("POST", "/users/{userId}/retweets", data) as any
  },
})
