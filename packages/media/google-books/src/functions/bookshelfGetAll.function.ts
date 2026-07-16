import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BookshelfGetAllInput = z.object({
  userId: z.string(),
  maxResults: z.number().optional(),
})

export const BookshelfGetAllOutput = z.record(z.string(), z.unknown())

export const bookshelfGetAll = pikkuSessionlessFunc({
  description: "Get many public bookshelves for a user",
  input: BookshelfGetAllInput,
  output: BookshelfGetAllOutput,
  func: async ({ googleBooks }, data) => {
    return googleBooks.call("GET", "/v1/users/{userId}/bookshelves", data) as any
  },
})
