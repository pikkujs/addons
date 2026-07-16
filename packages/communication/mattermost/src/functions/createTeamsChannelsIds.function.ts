// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const CreateTeamsChannelsIdsInput = z.object({
  team_id: z.string().describe("Team GUID"),
  body: z.array(z.string()),
})

export const CreateTeamsChannelsIdsOutput = z.array(z.object({
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

export const createTeamsChannelsIds = pikkuSessionlessFunc({
  description: "Get a list of public channels on a team by id.\n##### Permissions\n`view_team` for the team the channels are on.",
  input: CreateTeamsChannelsIdsInput,
  output: CreateTeamsChannelsIdsOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/teams/{team_id}/channels/ids", data) as any
  },
})
