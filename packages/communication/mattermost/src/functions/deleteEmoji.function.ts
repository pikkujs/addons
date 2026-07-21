// emoji — Endpoints for creating, getting and interacting with emojis.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeleteEmojiInput = z.object({
  emoji_id: z.string().describe("Emoji GUID"),
})

export const DeleteEmojiOutput = z.object({
  id: z.string().optional().describe("The ID of the emoji"),
  creator_id: z.string().optional().describe("The ID of the user that made the emoji"),
  name: z.string().optional().describe("The name of the emoji"),
  create_at: z.number().int().optional().describe("The time in milliseconds the emoji was made"),
  update_at: z.number().int().optional().describe("The time in milliseconds the emoji was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds the emoji was deleted"),
})

export const deleteEmoji = pikkuSessionlessFunc({
  description: "Delete a custom emoji.\n##### Permissions\nMust have the `manage_team` or `manage_system` permissions or be the user who created the emoji.",
  input: DeleteEmojiInput,
  output: DeleteEmojiOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/emoji/{emoji_id}", data) as any
  },
})
