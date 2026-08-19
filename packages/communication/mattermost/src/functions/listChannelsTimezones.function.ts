// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListChannelsTimezonesInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
})

export const ListChannelsTimezonesOutput = z.array(z.string())

export const listChannelsTimezones = pikkuSessionlessFunc({
  description: "Get a list of timezones for the users who are in this channel.\n\n__Minimum server version__: 5.6\n\n##### Permissions\nMust have the `read_channel` permission.",
  input: ListChannelsTimezonesInput,
  output: ListChannelsTimezonesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/channels/{channel_id}/timezones", data) as any
  },
})
