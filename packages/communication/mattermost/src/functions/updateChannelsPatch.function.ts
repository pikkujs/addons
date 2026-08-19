// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateChannelsPatchInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
  name: z.string().optional().describe("The unique handle for the channel, will be present in the channel URL"),
  display_name: z.string().optional().describe("The non-unique UI name for the channel"),
  purpose: z.string().optional().describe("A short description of the purpose of the channel"),
  header: z.string().optional().describe("Markdown-formatted text to display in the header of the channel"),
})

export const UpdateChannelsPatchOutput = z.object({
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

export const updateChannelsPatch = pikkuSessionlessFunc({
  description: "Partially update a channel by providing only the fields you want to update. Omitted fields will not be updated. The fields that can be updated are defined in the request body, all other provided fields will be ignored.\n##### Permissions\nIf updating a public channel, `manage_public_channel_members` permission is required. If updating a private channel, `manage_private_channel_members` permission is required.",
  input: UpdateChannelsPatchInput,
  output: UpdateChannelsPatchOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/channels/{channel_id}/patch", data) as any
  },
})
