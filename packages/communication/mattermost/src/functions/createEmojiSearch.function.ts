// emoji — Endpoints for creating, getting and interacting with emojis.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateEmojiSearchInput = z.object({
  term: z.string().describe("The term to match against the emoji name."),
  prefix_only: z.string().optional().describe("Set to only search for names starting with the search term."),
})

export const CreateEmojiSearchOutput = z.array(z.object({
  id: z.string().optional().describe("The ID of the emoji"),
  creator_id: z.string().optional().describe("The ID of the user that made the emoji"),
  name: z.string().optional().describe("The name of the emoji"),
  create_at: z.number().int().optional().describe("The time in milliseconds the emoji was made"),
  update_at: z.number().int().optional().describe("The time in milliseconds the emoji was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds the emoji was deleted"),
}))

export const createEmojiSearch = pikkuSessionlessFunc({
  description: "Search for custom emoji by name based on search criteria provided in the request body. A maximum of 200 results are returned.\n##### Permissions\nMust be authenticated.\n\n__Minimum server version__: 4.7",
  input: CreateEmojiSearchInput,
  output: CreateEmojiSearchOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/emoji/search", data) as any
  },
})
