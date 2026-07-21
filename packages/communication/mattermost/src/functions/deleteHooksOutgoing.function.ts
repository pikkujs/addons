// webhooks — Endpoints for creating, getting and updating webhooks.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteHooksOutgoingInput = z.object({
  hook_id: z.string().describe("Outgoing webhook GUID"),
})

export const DeleteHooksOutgoingOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteHooksOutgoing = pikkuSessionlessFunc({
  description: "Delete an outgoing webhook given the hook id.\n##### Permissions\n`manage_webhooks` for system or `manage_webhooks` for the specific team or `manage_webhooks` for the channel.",
  input: DeleteHooksOutgoingInput,
  output: DeleteHooksOutgoingOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/hooks/outgoing/{hook_id}", data) as any
  },
})
