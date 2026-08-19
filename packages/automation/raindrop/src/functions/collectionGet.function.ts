import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CollectionGetInput = z.object({
  collectionId: z.string(),
})

export const CollectionGetOutput = z.record(z.string(), z.unknown())

export const collectionGet = pikkuSessionlessFunc({
  description: "Get a collection",
  input: CollectionGetInput,
  output: CollectionGetOutput,
  func: async ({ raindrop }, data) => {
    return raindrop.call("GET", "/collection/{collectionId}", data) as any
  },
})
