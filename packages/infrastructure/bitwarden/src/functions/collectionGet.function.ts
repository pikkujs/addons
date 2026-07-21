import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CollectionGetInput = z.object({
  id: z.string(),
})

export const CollectionGetOutput = z.record(z.string(), z.unknown())

export const collectionGet = pikkuSessionlessFunc({
  description: "Get a collection",
  input: CollectionGetInput,
  output: CollectionGetOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("GET", "/public/collections/{id}", data) as any
  },
})
