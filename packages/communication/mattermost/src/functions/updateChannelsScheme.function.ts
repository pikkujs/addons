// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateChannelsSchemeInput = z.object({
  channel_id: z.string().describe("Channel GUID"),
  scheme_id: z.string().describe("The ID of the scheme."),
})

export const UpdateChannelsSchemeOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const updateChannelsScheme = pikkuSessionlessFunc({
  description: "Set a channel's scheme, more specifically sets the scheme_id value of a channel record.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 4.10",
  input: UpdateChannelsSchemeInput,
  output: UpdateChannelsSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/channels/{channel_id}/scheme", data) as any
  },
})
