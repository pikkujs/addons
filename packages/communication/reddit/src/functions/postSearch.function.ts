import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PostSearchInput = z.object({
  q: z.string(),
  restrict_sr: z.boolean().optional(),
  sort: z.string().optional(),
})

export const PostSearchOutput = z.record(z.string(), z.unknown())

export const postSearch = pikkuSessionlessFunc({
  description: "Search posts",
  input: PostSearchInput,
  output: PostSearchOutput,
  func: async ({ reddit }, data) => {
    return reddit.call("GET", "/search", data) as any
  },
})
