import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IndexGetAllOutput = z.record(z.string(), z.unknown())

export const indexGetAll = pikkuSessionlessFunc({
  description: "List all indices",
  output: IndexGetAllOutput,
  func: async ({ elasticsearch }) => {
    return elasticsearch.call("GET", "/_aliases") as any
  },
})
