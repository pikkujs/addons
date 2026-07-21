// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateChannelsInput = z.object({
  team_id: z.string().describe("The team ID of the team to create the channel on"),
  name: z.string().describe("The unique handle for the channel, will be present in the channel URL"),
  display_name: z.string().describe("The non-unique UI name for the channel"),
  purpose: z.string().optional().describe("A short description of the purpose of the channel"),
  header: z.string().optional().describe("Markdown-formatted text to display in the header of the channel"),
  type: z.string().describe("'O' for a public channel, 'P' for a private channel"),
})

export const CreateChannelsOutput = z.object({
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

export const createChannels = pikkuSessionlessFunc({
  description: "Create a new channel.\n##### Permissions\nIf creating a public channel, `create_public_channel` permission is required. If creating a private channel, `create_private_channel` permission is required.",
  input: CreateChannelsInput,
  output: CreateChannelsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/channels", data) as any
  },
})
