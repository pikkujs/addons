import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BookshelfVolumeMoveInput = z.object({
  shelfId: z.string(),
  volumeId: z.string().optional(),
  volumePosition: z.string().optional(),
})

export const BookshelfVolumeMoveOutput = z.record(z.string(), z.unknown())

export const bookshelfVolumeMove = pikkuSessionlessFunc({
  description: "Move a volume within a bookshelf",
  input: BookshelfVolumeMoveInput,
  output: BookshelfVolumeMoveOutput,
  func: async ({ googleBooks }, data) => {
    return googleBooks.call("POST", "/v1/mylibrary/bookshelves/{shelfId}/moveVolume", data) as any
  },
})
