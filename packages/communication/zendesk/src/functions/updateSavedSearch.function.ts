import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const UpdateSavedSearchInput = z.object({
  id: z.string().describe("The UUID of the saved search. Example: \"d8e18434-97aa-48b3-b406-a325715a50ed\""),
  filters: z.string().optional().describe("A JSON-stringified array of filter field IDs to persist alongside the search. Optional."),
  name: z.string().describe("The name given by the agent to the saved search. Must be 255 characters or less."),
  query: z.string().describe("The search query string. Must be 2000 characters or less."),
  type: z.enum(["ticket", "user", "organization", "side_conversation", "article"]).describe("The type of object the search applies to"),
})

export const UpdateSavedSearchOutput = z.object({
  saved_search: z.object({
    created_at: z.string().datetime().describe("The time the saved search was created"),
    filters: z.string().optional().describe("A JSON-stringified array of filter field IDs to persist alongside the search. Optional."),
    id: z.string().describe("Automatically assigned UUID when the saved search is created"),
    name: z.string().describe("The name given by the agent to the saved search"),
    query: z.string().describe("The search query string"),
    type: z.enum(["ticket", "user", "organization", "side_conversation", "article"]).describe("The type of object the search applies to"),
    updated_at: z.string().datetime().optional().describe("The time the saved search was last updated. Only present after an update."),
  }).optional(),
})

export const updateSavedSearch = pikkuSessionlessFunc({
  description: "Updates the name, type, and query of the saved search with the specified id for the requesting\nagent. Names must remain unique per agent.\n\n#### Allowed For\n- Agents (own saved searches only)",
  input: UpdateSavedSearchInput,
  output: UpdateSavedSearchOutput,
  errors: [NotFoundError, ConflictError, UnprocessableContentError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/saved_searches/{id}", data) as any
  },
})
