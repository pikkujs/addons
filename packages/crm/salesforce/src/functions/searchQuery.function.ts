import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SearchQueryInput = z.object({
  query: z.string(),
})

export const SearchQueryOutput = z.record(z.string(), z.unknown())

export const searchQuery = pikkuSessionlessFunc({
  description: "Search records",
  input: SearchQueryInput,
  output: SearchQueryOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/search/query", data) as any
  },
})
