import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EnrichGetInput = z.object({
  enrichId: z.string(),
})

export const EnrichGetOutput = z.record(z.string(), z.unknown())

export const enrichGet = pikkuSessionlessFunc({
  description: "Fetch a previously completed enrichment",
  input: EnrichGetInput,
  output: EnrichGetOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("GET", "/enrich/{enrichId}", data) as any
  },
})
