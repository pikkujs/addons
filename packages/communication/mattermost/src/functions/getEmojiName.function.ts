// emoji — Endpoints for creating, getting and interacting with emojis.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetEmojiNameInput = z.object({
  emoji_name: z.string().describe("Emoji name"),
})

export const GetEmojiNameOutput = z.object({
  id: z.string().optional().describe("The ID of the emoji"),
  creator_id: z.string().optional().describe("The ID of the user that made the emoji"),
  name: z.string().optional().describe("The name of the emoji"),
  create_at: z.number().int().optional().describe("The time in milliseconds the emoji was made"),
  update_at: z.number().int().optional().describe("The time in milliseconds the emoji was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds the emoji was deleted"),
})

export const getEmojiName = pikkuSessionlessFunc({
  description: "Get some metadata for a custom emoji using its name.\n##### Permissions\nMust be authenticated.\n\n__Minimum server version__: 4.7",
  input: GetEmojiNameInput,
  output: GetEmojiNameOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/emoji/name/{emoji_name}", data) as any
  },
})
