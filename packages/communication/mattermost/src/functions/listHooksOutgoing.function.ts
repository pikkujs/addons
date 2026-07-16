// webhooks — Endpoints for creating, getting and updating webhooks.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListHooksOutgoingInput = z.object({
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of hooks per page."),
  team_id: z.string().optional().describe("The ID of the team to get hooks for."),
  channel_id: z.string().optional().describe("The ID of the channel to get hooks for."),
})

export const ListHooksOutgoingOutput = z.array(z.object({
  id: z.string().optional().describe("The unique identifier for this outgoing webhook"),
  create_at: z.number().int().optional().describe("The time in milliseconds a outgoing webhook was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds a outgoing webhook was last updated"),
  delete_at: z.number().int().optional().describe("The time in milliseconds a outgoing webhook was deleted"),
  creator_id: z.string().optional().describe("The Id of the user who created the webhook"),
  team_id: z.string().optional().describe("The ID of the team that the webhook watchs"),
  channel_id: z.string().optional().describe("The ID of a public channel that the webhook watchs"),
  description: z.string().optional().describe("The description for this outgoing webhook"),
  display_name: z.string().optional().describe("The display name for this outgoing webhook"),
  trigger_words: z.array(z.string()).optional().describe("List of words for the webhook to trigger on"),
  trigger_when: z.number().int().optional().describe("When to trigger the webhook, `0` when a trigger word is present at all and `1` if the message starts with a trigger word"),
  callback_urls: z.array(z.string()).optional().describe("The URLs to POST the payloads to when the webhook is triggered"),
  content_type: z.string().optional().default("application/x-www-form-urlencoded").describe("The format to POST the data in, either `application/json` or `application/x-www-form-urlencoded`"),
}))

export const listHooksOutgoing = pikkuSessionlessFunc({
  description: "Get a page of a list of outgoing webhooks. Optionally filter for a specific team or channel using query parameters.\n##### Permissions\n`manage_webhooks` for the system or `manage_webhooks` for the specific team/channel.",
  input: ListHooksOutgoingInput,
  output: ListHooksOutgoingOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/hooks/outgoing", data) as any
  },
})
