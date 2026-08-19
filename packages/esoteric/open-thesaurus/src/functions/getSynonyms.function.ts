import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetSynonymsInput = z.object({
  q: z.string().optional(),
})

export const GetSynonymsOutput = z.record(z.string(), z.unknown())

export const getSynonyms = pikkuSessionlessFunc({
  description: "Get synonyms",
  input: GetSynonymsInput,
  output: GetSynonymsOutput,
  func: async ({ openThesaurus }, data) => {
    return openThesaurus.call("GET", "/synonyme/search", data) as any
  },
})
