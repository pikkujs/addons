import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SearchMessagesInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `search:read`"),
  count: z.number().int().optional().describe("Pass the number of results you want per \"page\". Maximum of `100`."),
  highlight: z.boolean().optional().describe("Pass a value of `true` to enable query highlight markers (see below)."),
  page: z.number().int().optional(),
  query: z.string().describe("Search query."),
  sort: z.string().optional().describe("Return matches sorted by either `score` or `timestamp`."),
  sort_dir: z.string().optional().describe("Change sort direction to ascending (`asc`) or descending (`desc`)."),
})

export const SearchMessagesOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const searchMessages = pikkuSessionlessFunc({
  description: "Searches for messages matching a query.",
  input: SearchMessagesInput,
  output: SearchMessagesOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/search.messages", data) as any
  },
})
