import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListSavedSearchesOutput = z.object({
  saved_searches: z.array(z.object({
    created_at: z.string().datetime().describe("The time the saved search was created"),
    filters: z.string().optional().describe("A JSON-stringified array of filter field IDs to persist alongside the search. Optional."),
    id: z.string().describe("Automatically assigned UUID when the saved search is created"),
    name: z.string().describe("The name given by the agent to the saved search"),
    query: z.string().describe("The search query string"),
    type: z.enum(["ticket", "user", "organization", "side_conversation", "article"]).describe("The type of object the search applies to"),
    updated_at: z.string().datetime().optional().describe("The time the saved search was last updated. Only present after an update."),
  })).optional(),
})

export const listSavedSearches = pikkuSessionlessFunc({
  description: "Returns all saved searches for the requesting agent.\n\n#### Allowed For\n- Agents",
  output: ListSavedSearchesOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/saved_searches") as any
  },
})
