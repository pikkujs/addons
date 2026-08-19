// bots — Endpoints for creating, getting and updating bot users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } from '@pikku/core/errors'

export const CreateBotsIconInput = z.object({
  bot_user_id: z.string().describe("Bot user ID"),
})

export const CreateBotsIconOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createBotsIcon = pikkuSessionlessFunc({
  description: "Set a bot's LHS icon image based on bot_user_id string parameter. Icon image must be SVG format, all other formats are rejected.\n##### Permissions\nMust have `manage_bots` permission.\n__Minimum server version__: 5.14",
  input: CreateBotsIconInput,
  output: CreateBotsIconOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/bots/{bot_user_id}/icon", data) as any
  },
})
