import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PersonEnrichInput = z.object({
  q: z.string().optional(),
})

export const PersonEnrichOutput = z.record(z.string(), z.unknown())

export const personEnrich = pikkuSessionlessFunc({
  description: "Person enrich",
  input: PersonEnrichInput,
  output: PersonEnrichOutput,
  func: async ({ uplead }, data) => {
    return uplead.call("GET", "/person-search", data) as any
  },
})
