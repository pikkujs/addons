import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SubredditGetAllInput = z.object({
  keyword: z.string().optional(),
  trending: z.boolean().optional(),
  limit: z.number().int().optional(),
})

export const SubredditGetAllOutput = z.record(z.string(), z.unknown())

export const subredditGetAll = pikkuSessionlessFunc({
  description: "Get all subreddits",
  input: SubredditGetAllInput,
  output: SubredditGetAllOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("GET", "/r/subreddits", data) as any
  },
})
