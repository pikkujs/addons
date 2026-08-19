// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateChannelsMembersRolesInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
  user_id: z.string().describe("User GUID"),
  roles: z.string(),
})

export const UpdateChannelsMembersRolesOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateChannelsMembersRoles = pikkuSessionlessFunc({
  description: "Update a user's roles for a channel.\n##### Permissions\nMust have `manage_channel_roles` permission for the channel.",
  input: UpdateChannelsMembersRolesInput,
  output: UpdateChannelsMembersRolesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/channels/{channel_id}/members/{user_id}/roles", data) as any
  },
})
