// bots — Endpoints for creating, getting and updating bot users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateBotsInput = z.object({
  username: z.string(),
  display_name: z.string().optional(),
  description: z.string().optional(),
})

export const CreateBotsOutput = z.object({
  user_id: z.string().optional().describe("The user id of the associated user entry."),
  create_at: z.number().int().optional().describe("The time in milliseconds a bot was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a bot was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a bot was deleted"),
  username: z.string().optional(),
  display_name: z.string().optional(),
  description: z.string().optional(),
  owner_id: z.string().optional().describe("The user id of the user that currently owns this bot."),
}).describe("A bot account")

export const createBots = pikkuSessionlessFunc({
  description: "Create a new bot account on the system. Username is required.\n##### Permissions\nMust have `create_bot` permission.\n__Minimum server version__: 5.10",
  input: CreateBotsInput,
  output: CreateBotsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/bots", data) as any
  },
})
