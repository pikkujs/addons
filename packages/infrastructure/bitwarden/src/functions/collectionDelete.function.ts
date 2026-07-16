import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CollectionDeleteInput = z.object({
  id: z.string(),
})

export const CollectionDeleteOutput = z.record(z.string(), z.unknown())

export const collectionDelete = pikkuSessionlessFunc({
  description: "Delete a collection",
  input: CollectionDeleteInput,
  output: CollectionDeleteOutput,
  func: async ({ bitwarden }, data) => {
    return bitwarden.call("DELETE", "/public/collections/{id}", data) as any
  },
})
