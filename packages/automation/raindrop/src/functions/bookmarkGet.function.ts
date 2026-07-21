import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BookmarkGetInput = z.object({
  bookmarkId: z.string(),
})

export const BookmarkGetOutput = z.record(z.string(), z.unknown())

export const bookmarkGet = pikkuSessionlessFunc({
  description: "Get a bookmark",
  input: BookmarkGetInput,
  output: BookmarkGetOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("GET", "/raindrop/{bookmarkId}", data) as any
  },
})
