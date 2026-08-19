// bots — Endpoints for creating, getting and updating bot users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListBotsInput = z.object({
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of users per page. There is a maximum limit of 200 users per page."),
  include_deleted: z.boolean().optional().describe("If deleted bots should be returned."),
  only_orphaned: z.boolean().optional().describe("When true, only orphaned bots will be returned. A bot is consitered orphaned if it's owner has been deactivated."),
})

export const ListBotsOutput = z.array(z.object({
  user_id: z.string().optional().describe("The user id of the associated user entry."),
  create_at: z.number().int().optional().describe("The time in milliseconds a bot was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a bot was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a bot was deleted"),
  username: z.string().optional(),
  display_name: z.string().optional(),
  description: z.string().optional(),
  owner_id: z.string().optional().describe("The user id of the user that currently owns this bot."),
}))

export const listBots = pikkuSessionlessFunc({
  description: "Get a page of a list of bots.\n##### Permissions\nMust have `read_bots` permission for bots you are managing, and `read_others_bots` permission for bots others are managing.\n__Minimum server version__: 5.10",
  input: ListBotsInput,
  output: ListBotsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/bots", data) as any
  },
})
