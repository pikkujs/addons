// bots — Endpoints for creating, getting and updating bot users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateBotsAssignInput = z.object({
  bot_user_id: z.string().describe("Bot user ID"),
  user_id: z.string().describe("The user ID to assign the bot to."),
})

export const CreateBotsAssignOutput = z.object({
  user_id: z.string().optional().describe("The user id of the associated user entry."),
  create_at: z.number().int().optional().describe("The time in milliseconds a bot was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a bot was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a bot was deleted"),
  username: z.string().optional(),
  display_name: z.string().optional(),
  description: z.string().optional(),
  owner_id: z.string().optional().describe("The user id of the user that currently owns this bot."),
}).describe("A bot account")

export const createBotsAssign = pikkuSessionlessFunc({
  description: "Assign a bot to a specified user.\n##### Permissions\nMust have `manage_bots` permission. \n__Minimum server version__: 5.10",
  input: CreateBotsAssignInput,
  output: CreateBotsAssignOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/bots/{bot_user_id}/assign/{user_id}", data) as any
  },
})
