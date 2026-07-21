// webhooks — Endpoints for creating, getting and updating webhooks.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListHooksIncomingInput = z.object({
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of hooks per page."),
  team_id: z.string().optional().describe("The ID of the team to get hooks for."),
})

export const ListHooksIncomingOutput = z.array(z.object({
  id: z.string().optional().describe("The unique identifier for this incoming webhook"),
  create_at: z.number().int().optional().describe("The time in milliseconds a incoming webhook was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a incoming webhook was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a incoming webhook was deleted"),
  channel_id: z.string().optional().describe("The ID of a public channel or private group that receives the webhook payloads"),
  description: z.string().optional().describe("The description for this incoming webhook"),
  display_name: z.string().optional().describe("The display name for this incoming webhook"),
}))

export const listHooksIncoming = pikkuSessionlessFunc({
  description: "Get a page of a list of incoming webhooks. Optionally filter for a specific team using query parameters.\n##### Permissions\n`manage_webhooks` for the system or `manage_webhooks` for the specific team.",
  input: ListHooksIncomingInput,
  output: ListHooksIncomingOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/hooks/incoming", data) as any
  },
})
