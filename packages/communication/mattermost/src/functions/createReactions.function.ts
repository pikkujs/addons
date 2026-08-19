// reactions — Endpoints for creating, getting and removing emoji reactions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const CreateReactionsInput = z.object({
  user_id: z.string().optional().describe("The ID of the user that made this reaction"),
  post_id: z.string().optional().describe("The ID of the post to which this reaction was made"),
  emoji_name: z.string().optional().describe("The name of the emoji that was used for this reaction"),
  create_at: z.number().int().optional().describe("The time in milliseconds this reaction was made"),
})

export const CreateReactionsOutput = z.object({
  user_id: z.string().optional().describe("The ID of the user that made this reaction"),
  post_id: z.string().optional().describe("The ID of the post to which this reaction was made"),
  emoji_name: z.string().optional().describe("The name of the emoji that was used for this reaction"),
  create_at: z.number().int().optional().describe("The time in milliseconds this reaction was made"),
})

export const createReactions = pikkuSessionlessFunc({
  description: "Create a reaction.\n##### Permissions\nMust have `read_channel` permission for the channel the post is in.",
  input: CreateReactionsInput,
  output: CreateReactionsOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/reactions", data) as any
  },
})
