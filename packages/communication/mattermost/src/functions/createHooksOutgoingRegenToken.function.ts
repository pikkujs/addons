// webhooks — Endpoints for creating, getting and updating webhooks.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateHooksOutgoingRegenTokenInput = z.object({
  hook_id: z.string().describe("Outgoing webhook GUID"),
})

export const CreateHooksOutgoingRegenTokenOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createHooksOutgoingRegenToken = pikkuSessionlessFunc({
  description: "Regenerate the token for the outgoing webhook.\n##### Permissions\n`manage_webhooks` for system or `manage_webhooks` for the specific team or `manage_webhooks` for the channel.",
  input: CreateHooksOutgoingRegenTokenInput,
  output: CreateHooksOutgoingRegenTokenOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/hooks/outgoing/{hook_id}/regen_token", data) as any
  },
})
