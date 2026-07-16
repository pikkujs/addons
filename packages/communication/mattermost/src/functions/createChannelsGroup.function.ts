// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateChannelsGroupInput = z.object({
  body: z.array(z.string()),
})

export const CreateChannelsGroupOutput = z.object({
  id: z.string().optional(),
  create_at: z.number().int().optional().describe("The time in milliseconds a channel was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a channel was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a channel was deleted"),
  team_id: z.string().optional(),
  type: z.string().optional(),
  display_name: z.string().optional(),
  name: z.string().optional(),
  header: z.string().optional(),
  purpose: z.string().optional(),
  last_post_at: z.number().int().optional().describe("The time in milliseconds of the last post of a channel"),
  total_msg_count: z.number().int().optional(),
  extra_update_at: z.number().int().optional().describe("Deprecated in Mattermost 5.0 release"),
  creator_id: z.string().optional(),
})

export const createChannelsGroup = pikkuSessionlessFunc({
  description: "Create a new group message channel to group of users. If the logged in user's id is not included in the list, it will be appended to the end.\n##### Permissions\nMust have `create_group_channel` permission.",
  input: CreateChannelsGroupInput,
  output: CreateChannelsGroupOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/channels/group", data) as any
  },
})
