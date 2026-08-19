// webhooks — Endpoints for creating, getting and updating webhooks.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateHooksIncomingInput = z.object({
  channel_id: z.string().describe("The ID of a public channel or private group that receives the webhook payloads."),
  display_name: z.string().optional().describe("The display name for this incoming webhook"),
  description: z.string().optional().describe("The description for this incoming webhook"),
  username: z.string().optional().describe("The username this incoming webhook will post as."),
  icon_url: z.string().optional().describe("The profile picture this incoming webhook will use when posting."),
})

export const CreateHooksIncomingOutput = z.object({
  id: z.string().optional().describe("The unique identifier for this incoming webhook"),
  create_at: z.number().int().optional().describe("The time in milliseconds a incoming webhook was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a incoming webhook was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a incoming webhook was deleted"),
  channel_id: z.string().optional().describe("The ID of a public channel or private group that receives the webhook payloads"),
  description: z.string().optional().describe("The description for this incoming webhook"),
  display_name: z.string().optional().describe("The display name for this incoming webhook"),
})

export const createHooksIncoming = pikkuSessionlessFunc({
  description: "Create an incoming webhook for a channel.\n##### Permissions\n`manage_webhooks` for the channel the webhook is in.",
  input: CreateHooksIncomingInput,
  output: CreateHooksIncomingOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/hooks/incoming", data) as any
  },
})
