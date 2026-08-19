// bots — Endpoints for creating, getting and updating bot users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const ListBotsIconInput = z.object({
  bot_user_id: z.string().describe("Bot user ID"),
})

export const listBotsIcon = pikkuSessionlessFunc({
  description: "Get a bot's LHS icon image based on bot_user_id string parameter.\n##### Permissions\nMust be logged in.\n__Minimum server version__: 5.14",
  input: ListBotsIconInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/bots/{bot_user_id}/icon", data)
  },
})
