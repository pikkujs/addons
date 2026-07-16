// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListChannelsStatsInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
})

export const ListChannelsStatsOutput = z.object({
  channel_id: z.string().optional(),
  member_count: z.number().int().optional(),
})

export const listChannelsStats = pikkuSessionlessFunc({
  description: "Get statistics for a channel.\n##### Permissions\nMust have the `read_channel` permission.",
  input: ListChannelsStatsInput,
  output: ListChannelsStatsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/channels/{channel_id}/stats", data) as any
  },
})
