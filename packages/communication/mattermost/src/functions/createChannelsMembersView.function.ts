// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateChannelsMembersViewInput = z.object({
  user_id: z.string().describe("User ID to perform the view action for"),
  channel_id: z.string().describe("The channel ID that is being viewed. Use a blank string to indicate that all channels have lost focus."),
  prev_channel_id: z.string().optional().describe("The channel ID of the previous channel, used when switching channels. Providing this ID will cause push notifications to clear on the channel being switched to."),
})

export const CreateChannelsMembersViewOutput = z.object({
  status: z.string().optional().describe("Value should be \"OK\" if successful"),
  last_viewed_at_times: z.record(z.string(), z.unknown()).optional().describe("A JSON object mapping channel IDs to the channel view times"),
})

export const createChannelsMembersView = pikkuSessionlessFunc({
  description: "Perform all the actions involved in viewing a channel. This includes marking channels as read, clearing push notifications, and updating the active channel.\n##### Permissions\nMust be logged in as user or have `edit_other_users` permission.\n\n__Response only includes `last_viewed_at_times` in Mattermost server 4.3 and newer.__",
  input: CreateChannelsMembersViewInput,
  output: CreateChannelsMembersViewOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/channels/members/{user_id}/view", data) as any
  },
})
