// webhooks — Endpoints for creating, getting and updating webhooks.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateHooksIncomingInput = z.object({
  hook_id: z.string().describe("Incoming Webhook GUID"),
  channel_id: z.string().describe("The ID of a public channel or private group that receives the webhook payloads."),
  display_name: z.string().describe("The display name for this incoming webhook"),
  description: z.string().describe("The description for this incoming webhook"),
  username: z.string().optional().describe("The username this incoming webhook will post as."),
  icon_url: z.string().optional().describe("The profile picture this incoming webhook will use when posting."),
})

export const UpdateHooksIncomingOutput = z.object({
  id: z.string().optional().describe("The unique identifier for this incoming webhook"),
  create_at: z.number().int().optional().describe("The time in milliseconds a incoming webhook was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a incoming webhook was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a incoming webhook was deleted"),
  channel_id: z.string().optional().describe("The ID of a public channel or private group that receives the webhook payloads"),
  description: z.string().optional().describe("The description for this incoming webhook"),
  display_name: z.string().optional().describe("The display name for this incoming webhook"),
})

export const updateHooksIncoming = pikkuSessionlessFunc({
  description: "Update an incoming webhook given the hook id.\n##### Permissions\n`manage_webhooks` for system or `manage_webhooks` for the specific team or `manage_webhooks` for the channel.",
  input: UpdateHooksIncomingInput,
  output: UpdateHooksIncomingOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/hooks/incoming/{hook_id}", data) as any
  },
})
