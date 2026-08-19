// bots — Endpoints for creating, getting and updating bot users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const DeleteBotsIconInput = z.object({
  bot_user_id: z.string().describe("Bot user ID"),
})

export const DeleteBotsIconOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteBotsIcon = pikkuSessionlessFunc({
  description: "Delete bot's LHS icon image based on bot_user_id string parameter.\n##### Permissions\nMust have `manage_bots` permission.\n__Minimum server version__: 5.14",
  input: DeleteBotsIconInput,
  output: DeleteBotsIconOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/bots/{bot_user_id}/icon", data) as any
  },
})
