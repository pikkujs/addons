import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BookmarkGetAllInput = z.object({
  collectionId: z.string(),
})

export const BookmarkGetAllOutput = z.record(z.string(), z.unknown())

export const bookmarkGetAll = pikkuSessionlessFunc({
  description: "Get all bookmarks in a collection",
  input: BookmarkGetAllInput,
  output: BookmarkGetAllOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("GET", "/raindrops/{collectionId}", data) as any
  },
})
