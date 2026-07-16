import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CollectionGetAllOutput = z.record(z.string(), z.unknown())

export const collectionGetAll = pikkuSessionlessFunc({
  description: "List collections",
  output: CollectionGetAllOutput,
  func: async ({ bitwarden }) => {
    return bitwarden.call("GET", "/public/collections") as any
  },
})
