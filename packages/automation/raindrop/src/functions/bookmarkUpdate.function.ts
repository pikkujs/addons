import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BookmarkUpdateInput = z.object({
  bookmarkId: z.string(),
  title: z.string().optional(),
  excerpt: z.string().optional(),
  important: z.boolean().optional(),
})

export const BookmarkUpdateOutput = z.record(z.string(), z.unknown())

export const bookmarkUpdate = pikkuSessionlessFunc({
  description: "Update a bookmark",
  input: BookmarkUpdateInput,
  output: BookmarkUpdateOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("PUT", "/raindrop/{bookmarkId}", data) as any
  },
})
