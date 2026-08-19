import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const CreateSavedSearchInput = z.object({
  filters: z.string().optional().describe("A JSON-stringified array of filter field IDs to persist alongside the search. Optional."),
  name: z.string().describe("The name given by the agent to the saved search. Must be 255 characters or less."),
  query: z.string().describe("The search query string. Must be 2000 characters or less."),
  type: z.enum(["ticket", "user", "organization", "side_conversation", "article"]).describe("The type of object the search applies to"),
})

export const CreateSavedSearchOutput = z.object({
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

export const createSavedSearch = pikkuSessionlessFunc({
  description: "Creates a saved search for the requesting agent. An agent can have at most 20 saved searches,\nand names must be unique per agent.\n\n#### Allowed For\n- Agents",
  input: CreateSavedSearchInput,
  output: CreateSavedSearchOutput,
  errors: [ConflictError, UnprocessableContentError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/saved_searches", data) as any
  },
})
