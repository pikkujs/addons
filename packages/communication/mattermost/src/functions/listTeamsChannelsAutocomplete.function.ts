// channels — Endpoints for creating, getting and interacting with channels.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ListTeamsChannelsAutocompleteInput = z.object({
  team_id: z.string().describe("Team GUID"),
  name: z.string().describe("Name or display name"),
})

export const ListTeamsChannelsAutocompleteOutput = z.array(z.object({
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

export const listTeamsChannelsAutocomplete = pikkuSessionlessFunc({
  description: "Autocomplete public channels on a team based on the search term provided in the request URL.\n\n__Minimum server version__: 4.7\n\n##### Permissions\nMust have the `list_team_channels` permission.",
  input: ListTeamsChannelsAutocompleteInput,
  output: ListTeamsChannelsAutocompleteOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/teams/{team_id}/channels/autocomplete", data) as any
  },
})
