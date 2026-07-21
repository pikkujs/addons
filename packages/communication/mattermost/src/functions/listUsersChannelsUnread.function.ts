// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListUsersChannelsUnreadInput = z.object({
  user_id: z.string().describe("User GUID"),
  channel_id: z.string().describe("Channel GUID"),
})

export const ListUsersChannelsUnreadOutput = z.object({
  team_id: z.string().optional(),
  channel_id: z.string().optional(),
  msg_count: z.number().int().optional(),
  mention_count: z.number().int().optional(),
})

export const listUsersChannelsUnread = pikkuSessionlessFunc({
  description: "Get the total unread messages and mentions for a channel for a user.\n##### Permissions\nMust be logged in as user and have the `read_channel` permission, or have `edit_other_usrs` permission.",
  input: ListUsersChannelsUnreadInput,
  output: ListUsersChannelsUnreadOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/users/{user_id}/channels/{channel_id}/unread", data) as any
  },
})
