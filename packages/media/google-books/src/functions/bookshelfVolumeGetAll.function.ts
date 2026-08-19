import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BookshelfVolumeGetAllInput = z.object({
  userId: z.string(),
  shelfId: z.string(),
  maxResults: z.number().optional(),
})

export const BookshelfVolumeGetAllOutput = z.record(z.string(), z.unknown())

export const bookshelfVolumeGetAll = pikkuSessionlessFunc({
  description: "Get many volumes in a bookshelf for a user",
  input: BookshelfVolumeGetAllInput,
  output: BookshelfVolumeGetAllOutput,
  func: async ({ googleBooks }, data) => {
    return googleBooks.call("GET", "/v1/users/{userId}/bookshelves/{shelfId}/volumes", data) as any
  },
})
