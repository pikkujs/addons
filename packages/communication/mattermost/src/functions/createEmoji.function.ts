// emoji — Endpoints for creating, getting and interacting with emojis.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateEmojiOutput = z.object({
  id: z.string().optional().describe("The ID of the emoji"),
  creator_id: z.string().optional().describe("The ID of the user that made the emoji"),
  name: z.string().optional().describe("The name of the emoji"),
  create_at: z.number().int().optional().describe("The time in milliseconds the emoji was made"),
  update_at: z.number().int().optional().describe("The time in milliseconds the emoji was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds the emoji was deleted"),
})

export const createEmoji = pikkuSessionlessFunc({
  description: "Create a custom emoji for the team.\n##### Permissions\nMust be authenticated.",
  output: CreateEmojiOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/emoji") as any
  },
})
