// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateChannelsMembersNotifyPropsInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
  user_id: z.string().describe("User GUID"),
  email: z.string().optional().describe("Set to \"true\" to enable email notifications, \"false\" to disable, or \"default\" to use the global user notification setting."),
  push: z.string().optional().describe("Set to \"all\" to receive push notifications for all activity, \"mention\" for mentions and direct messages only, \"none\" to disable, or \"default\" to use the global user notification setting."),
  desktop: z.string().optional().describe("Set to \"all\" to receive desktop notifications for all activity, \"mention\" for mentions and direct messages only, \"none\" to disable, or \"default\" to use the global user notification setting."),
  mark_unread: z.string().optional().describe("Set to \"all\" to mark the channel unread for any new message, \"mention\" to mark unread for new mentions only. Defaults to \"all\"."),
})

export const UpdateChannelsMembersNotifyPropsOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateChannelsMembersNotifyProps = pikkuSessionlessFunc({
  description: "Update a user's notification properties for a channel. Only the provided fields are updated.\n##### Permissions\nMust be logged in as the user or have `edit_other_users` permission.",
  input: UpdateChannelsMembersNotifyPropsInput,
  output: UpdateChannelsMembersNotifyPropsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/channels/{channel_id}/members/{user_id}/notify_props", data) as any
  },
})
