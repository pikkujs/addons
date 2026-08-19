import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BookshelfVolumeClearInput = z.object({
  shelfId: z.string(),
})

export const BookshelfVolumeClearOutput = z.record(z.string(), z.unknown())

export const bookshelfVolumeClear = pikkuSessionlessFunc({
  description: "Clear all volumes from a bookshelf",
  input: BookshelfVolumeClearInput,
  output: BookshelfVolumeClearOutput,
  func: async ({ googleBooks }, data) => {
    return googleBooks.call("POST", "/v1/mylibrary/bookshelves/{shelfId}/clearVolumes", data) as any
  },
})
