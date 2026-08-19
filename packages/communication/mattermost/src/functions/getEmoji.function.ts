// emoji — Endpoints for creating, getting and interacting with emojis.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetEmojiInput = z.object({
  emoji_id: z.string().describe("Emoji GUID"),
})

export const GetEmojiOutput = z.object({
  id: z.string().optional().describe("The ID of the emoji"),
  creator_id: z.string().optional().describe("The ID of the user that made the emoji"),
  name: z.string().optional().describe("The name of the emoji"),
  create_at: z.number().int().optional().describe("The time in milliseconds the emoji was made"),
  update_at: z.number().int().optional().describe("The time in milliseconds the emoji was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds the emoji was deleted"),
})

export const getEmoji = pikkuSessionlessFunc({
  description: "Get some metadata for a custom emoji.\n##### Permissions\nMust be authenticated.",
  input: GetEmojiInput,
  output: GetEmojiOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/emoji/{emoji_id}", data) as any
  },
})
