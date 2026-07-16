// schemes — Endpoints for creating, getting and updating and deleting schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListSchemesChannelsInput = z.object({
  scheme_id: z.string().describe("Scheme GUID"),
  page: z.string().optional().default("0").describe("The page to select."),
  per_page: z.string().optional().default("60").describe("The number of channels per page."),
})

export const ListSchemesChannelsOutput = z.array(z.object({
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
}))

export const listSchemesChannels = pikkuSessionlessFunc({
  description: "Get a page of channels which use this scheme. The provided Scheme ID should be for a Channel-scoped Scheme.\nUse the query parameters to modify the behaviour of this endpoint.\n\n##### Permissions\n`manage_system` permission is required.\n\n__Minimum server version__: 5.0",
  input: ListSchemesChannelsInput,
  output: ListSchemesChannelsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/schemes/{scheme_id}/channels", data) as any
  },
})
