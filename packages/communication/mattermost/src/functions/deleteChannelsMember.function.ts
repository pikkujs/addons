// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeleteChannelsMemberInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
  user_id: z.string().describe("User GUID"),
})

export const DeleteChannelsMemberOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteChannelsMember = pikkuSessionlessFunc({
  description: "Delete a channel member, effectively removing them from a channel.\n\nIn server version 5.3 and later, channel members can only be deleted from public or private channels.\n##### Permissions\n`manage_public_channel_members` permission if the channel is public.\n`manage_private_channel_members` permission if the channel is private.",
  input: DeleteChannelsMemberInput,
  output: DeleteChannelsMemberOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/channels/{channel_id}/members/{user_id}", data) as any
  },
})
