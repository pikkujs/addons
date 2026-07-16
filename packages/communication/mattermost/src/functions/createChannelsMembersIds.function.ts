// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateChannelsMembersIdsInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
  body: z.array(z.string()),
})

export const CreateChannelsMembersIdsOutput = z.array(z.object({
  channel_id: z.string().optional(),
  user_id: z.string().optional(),
  roles: z.string().optional(),
  last_viewed_at: z.number().int().optional().describe("The time in milliseconds the channel was last viewed by the user"),
  msg_count: z.number().int().optional(),
  mention_count: z.number().int().optional(),
  notify_props: z.object({
    email: z.string().optional().describe("Set to \"true\" to enable email notifications, \"false\" to disable, or \"default\" to use the global user notification setting."),
    push: z.string().optional().describe("Set to \"all\" to receive push notifications for all activity, \"mention\" for mentions and direct messages only, \"none\" to disable, or \"default\" to use the global user notification setting."),
    desktop: z.string().optional().describe("Set to \"all\" to receive desktop notifications for all activity, \"mention\" for mentions and direct messages only, \"none\" to disable, or \"default\" to use the global user notification setting."),
    mark_unread: z.string().optional().describe("Set to \"all\" to mark the channel unread for any new message, \"mention\" to mark unread for new mentions only. Defaults to \"all\"."),
  }).optional().describe("Field only visible to self and admins"),
  last_update_at: z.number().int().optional().describe("The time in milliseconds the channel member was last updated"),
}))

export const createChannelsMembersIds = pikkuSessionlessFunc({
  description: "Get a list of channel members based on the provided user ids.\n##### Permissions\nMust have the `read_channel` permission.",
  input: CreateChannelsMembersIdsInput,
  output: CreateChannelsMembersIdsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/channels/{channel_id}/members/ids", data) as any
  },
})
