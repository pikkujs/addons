import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CollectionGetAllOutput = z.record(z.string(), z.unknown())

export const collectionGetAll = pikkuSessionlessFunc({
  description: "Get all root collections",
  output: CollectionGetAllOutput,
  func: async ({ raindrop }) => {
    return raindrop.call("GET", "/collections") as any
  },
})
