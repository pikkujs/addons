import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BookshelfVolumeRemoveInput = z.object({
  shelfId: z.string(),
  volumeId: z.string().optional(),
})

export const BookshelfVolumeRemoveOutput = z.record(z.string(), z.unknown())

export const bookshelfVolumeRemove = pikkuSessionlessFunc({
  description: "Remove a volume from a bookshelf",
  input: BookshelfVolumeRemoveInput,
  output: BookshelfVolumeRemoveOutput,
  func: async ({ googleBooks }, data) => {
    return googleBooks.call("POST", "/v1/mylibrary/bookshelves/{shelfId}/removeVolume", data) as any
  },
})
