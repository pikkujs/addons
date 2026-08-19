import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CountSearchResultsInput = z.object({
  query: z.string().describe("The search query. Example: \"https://subdomain.zendesk.com/api/v2/search?query=type:ticket status:closed\""),
})

export const CountSearchResultsOutput = z.object({
  count: z.number().int().optional(),
})

export const countSearchResults = pikkuSessionlessFunc({
  description: "Returns the number of items matching the query rather than the items. The search string works the same as a regular search.\n\n#### Allowed For\n\n- Agents",
  input: CountSearchResultsInput,
  output: CountSearchResultsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/search/count", data) as any
  },
})
