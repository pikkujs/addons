import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TweetSearchInput = z.object({
  query: z.string(),
  max_results: z.number().int().optional(),
  sort_order: z.string().optional(),
})

export const TweetSearchOutput = z.record(z.string(), z.unknown())

export const tweetSearch = pikkuSessionlessFunc({
  description: "Search recent tweets",
  input: TweetSearchInput,
  output: TweetSearchOutput,
  func: async ({ twitter }, data) => {
    return twitter.call("GET", "/tweets/search/recent", data) as any
  },
})
