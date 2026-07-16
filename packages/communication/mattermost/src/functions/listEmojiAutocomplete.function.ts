// emoji — Endpoints for creating, getting and interacting with emojis.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListEmojiAutocompleteInput = z.object({
  name: z.string().describe("The emoji name to search."),
})

export const ListEmojiAutocompleteOutput = z.object({
  id: z.string().optional().describe("The ID of the emoji"),
  creator_id: z.string().optional().describe("The ID of the user that made the emoji"),
  name: z.string().optional().describe("The name of the emoji"),
  create_at: z.number().int().optional().describe("The time in milliseconds the emoji was made"),
  update_at: z.number().int().optional().describe("The time in milliseconds the emoji was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds the emoji was deleted"),
})

export const listEmojiAutocomplete = pikkuSessionlessFunc({
  description: "Get a list of custom emoji with names starting with or matching the provided name. Returns a maximum of 100 results.\n##### Permissions\nMust be authenticated.\n\n__Minimum server version__: 4.7",
  input: ListEmojiAutocompleteInput,
  output: ListEmojiAutocompleteOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/emoji/autocomplete", data) as any
  },
})
