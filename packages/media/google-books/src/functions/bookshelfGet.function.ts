import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BookshelfGetInput = z.object({
  userId: z.string(),
  shelfId: z.string(),
})

export const BookshelfGetOutput = z.record(z.string(), z.unknown())

export const bookshelfGet = pikkuSessionlessFunc({
  description: "Get a bookshelf resource for a user",
  input: BookshelfGetInput,
  output: BookshelfGetOutput,
  func: async ({ googleBooks }, data) => {
    return googleBooks.call("GET", "/v1/users/{userId}/bookshelves/{shelfId}", data) as any
  },
})
