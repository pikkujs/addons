import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BookshelfVolumeAddInput = z.object({
  shelfId: z.string(),
  volumeId: z.string().optional(),
})

export const BookshelfVolumeAddOutput = z.record(z.string(), z.unknown())

export const bookshelfVolumeAdd = pikkuSessionlessFunc({
  description: "Add a volume to a bookshelf",
  input: BookshelfVolumeAddInput,
  output: BookshelfVolumeAddOutput,
  func: async ({ googleBooks }, data) => {
    return googleBooks.call("POST", "/v1/mylibrary/bookshelves/{shelfId}/addVolume", data) as any
  },
})
