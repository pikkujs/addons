// bots — Endpoints for creating, getting and updating bot users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateBotInput = z.object({
  bot_user_id: z.string().describe("Bot user ID"),
  username: z.string(),
  display_name: z.string().optional(),
  description: z.string().optional(),
})

export const UpdateBotOutput = z.object({
  user_id: z.string().optional().describe("The user id of the associated user entry."),
  create_at: z.number().int().optional().describe("The time in milliseconds a bot was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a bot was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a bot was deleted"),
  username: z.string().optional(),
  display_name: z.string().optional(),
  description: z.string().optional(),
  owner_id: z.string().optional().describe("The user id of the user that currently owns this bot."),
}).describe("A bot account")

export const updateBot = pikkuSessionlessFunc({
  description: "Partially update a bot by providing only the fields you want to update. Omitted fields will not be updated. The fields that can be updated are defined in the request body, all other provided fields will be ignored.\n##### Permissions\nMust have `manage_bots` permission. \n__Minimum server version__: 5.10",
  input: UpdateBotInput,
  output: UpdateBotOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/bots/{bot_user_id}", data) as any
  },
})
