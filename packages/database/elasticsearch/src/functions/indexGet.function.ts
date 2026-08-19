import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IndexGetInput = z.object({
  indexId: z.string(),
})

export const IndexGetOutput = z.record(z.string(), z.unknown())

export const indexGet = pikkuSessionlessFunc({
  description: "Get an index",
  input: IndexGetInput,
  output: IndexGetOutput,
  func: async ({ elasticsearch }, data) => {
    return elasticsearch.call("GET", "/{indexId}", data) as any
  },
})
