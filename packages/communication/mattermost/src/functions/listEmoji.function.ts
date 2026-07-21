// emoji — Endpoints for creating, getting and interacting with emojis.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListEmojiInput = z.object({
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of users per page."),
  sort: z.string().optional().default("").describe("Either blank for no sorting or \"name\" to sort by emoji names. Minimum server version for sorting is 4.7."),
})

export const ListEmojiOutput = z.object({
  id: z.string().optional().describe("The ID of the emoji"),
  creator_id: z.string().optional().describe("The ID of the user that made the emoji"),
  name: z.string().optional().describe("The name of the emoji"),
  create_at: z.number().int().optional().describe("The time in milliseconds the emoji was made"),
  update_at: z.number().int().optional().describe("The time in milliseconds the emoji was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds the emoji was deleted"),
})

export const listEmoji = pikkuSessionlessFunc({
  description: "Get a page of metadata for custom emoji on the system. Since server version 4.7, sort using the `sort` query parameter.\n##### Permissions\nMust be authenticated.",
  input: ListEmojiInput,
  output: ListEmojiOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/emoji", data) as any
  },
})
