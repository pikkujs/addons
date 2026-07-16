import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IndexDeleteInput = z.object({
  indexId: z.string(),
})

export const IndexDeleteOutput = z.record(z.string(), z.unknown())

export const indexDelete = pikkuSessionlessFunc({
  description: "Delete an index",
  input: IndexDeleteInput,
  output: IndexDeleteOutput,
  func: async ({ elasticsearch }, data) => {
    return elasticsearch.call("DELETE", "/{indexId}", data) as any
  },
})
