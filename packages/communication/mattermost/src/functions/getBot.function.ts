// bots — Endpoints for creating, getting and updating bot users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetBotInput = z.object({
  bot_user_id: z.string().describe("Bot user ID"),
  include_deleted: z.boolean().optional().describe("If deleted bots should be returned."),
})

export const GetBotOutput = z.object({
  user_id: z.string().optional().describe("The user id of the associated user entry."),
  create_at: z.number().int().optional().describe("The time in milliseconds a bot was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a bot was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a bot was deleted"),
  username: z.string().optional(),
  display_name: z.string().optional(),
  description: z.string().optional(),
  owner_id: z.string().optional().describe("The user id of the user that currently owns this bot."),
}).describe("A bot account")

export const getBot = pikkuSessionlessFunc({
  description: "Get a bot specified by its bot id.\n##### Permissions\nMust have `read_bots` permission for bots you are managing, and `read_others_bots` permission for bots others are managing.\n__Minimum server version__: 5.10",
  input: GetBotInput,
  output: GetBotOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/bots/{bot_user_id}", data) as any
  },
})
