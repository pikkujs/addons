// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetTeamsNameChannelsNameInput = z.object({
  team_name: z.string().describe("Team Name"),
  channel_name: z.string().describe("Channel Name"),
  include_deleted: z.union([z.literal(true), z.literal(false)]).optional().describe("Defines if deleted channels should be returned or not"),
})

export const GetTeamsNameChannelsNameOutput = z.object({
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

export const getTeamsNameChannelsName = pikkuSessionlessFunc({
  description: "Gets a channel from the provided team name and channel name strings.\n##### Permissions\n`read_channel` permission for the channel.",
  input: GetTeamsNameChannelsNameInput,
  output: GetTeamsNameChannelsNameOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/teams/name/{team_name}/channels/name/{channel_name}", data) as any
  },
})
