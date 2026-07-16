import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BookmarkDeleteInput = z.object({
  bookmarkId: z.string(),
})

export const BookmarkDeleteOutput = z.record(z.string(), z.unknown())

export const bookmarkDelete = pikkuSessionlessFunc({
  description: "Delete a bookmark",
  input: BookmarkDeleteInput,
  output: BookmarkDeleteOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("DELETE", "/raindrop/{bookmarkId}", data) as any
  },
})
