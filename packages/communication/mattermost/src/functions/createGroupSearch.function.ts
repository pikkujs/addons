// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const CreateGroupSearchInput = z.object({
  term: z.string().describe("The search term to match against the members' usernames of the group channels"),
})

export const CreateGroupSearchOutput = z.array(z.object({
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

export const createGroupSearch = pikkuSessionlessFunc({
  description: "Get a list of group channels for a user which members' usernames match the search term.\n\n__Minimum server version__: 5.14",
  input: CreateGroupSearchInput,
  output: CreateGroupSearchOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/group/search", data) as any
  },
})
