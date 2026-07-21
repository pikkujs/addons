// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeleteChannelInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
})

export const DeleteChannelOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteChannel = pikkuSessionlessFunc({
  description: "Soft deletes a channel, by marking the channel as deleted in the database. Soft deleted channels will not be accessible in the user interface. Direct and group message channels cannot be deleted.\n##### Permissions\n`delete_public_channel` permission if the channel is public,\n`delete_private_channel` permission if the channel is private,\nor have `manage_system` permission.",
  input: DeleteChannelInput,
  output: DeleteChannelOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/channels/{channel_id}", data) as any
  },
})
