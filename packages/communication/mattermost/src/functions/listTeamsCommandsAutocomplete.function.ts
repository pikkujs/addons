// commands — Endpoints for creating, getting and updating slash commands.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ListTeamsCommandsAutocompleteInput = z.object({
  team_id: z.string().describe("Team GUID"),
})

export const ListTeamsCommandsAutocompleteOutput = z.array(z.object({
  id: z.string().optional().describe("The ID of the slash command"),
  token: z.string().optional().describe("The token which is used to verify the source of the payload"),
  create_at: z.number().int().optional().describe("The time in milliseconds the command was created"),
  update_at: z.number().int().optional().describe("The time in milliseconds the command was last updated"),
  deleted_at: z.number().int().optional().describe("The time in milliseconds the command was deleted, 0 if never deleted"),
  creator_id: z.string().optional().describe("The user id for the commands creator"),
  team_id: z.string().optional().describe("The team id for which this command is configured"),
  trigger: z.string().optional().describe("The string that triggers this command"),
  method: z.string().optional().describe("Is the trigger done with HTTP Get ('G') or HTTP Post ('P')"),
  username: z.string().optional().describe("What is the username for the response post"),
  icon_url: z.string().optional().describe("The url to find the icon for this users avatar"),
  auto_complete: z.boolean().optional().describe("Use auto complete for this command"),
  auto_complete_desc: z.string().optional().describe("The description for this command shown when selecting the command"),
  auto_complete_hint: z.string().optional().describe("The hint for this command"),
  display_name: z.string().optional().describe("Display name for the command"),
  description: z.string().optional().describe("Description for this command"),
  url: z.string().optional().describe("The URL that is triggered"),
}))

export const listTeamsCommandsAutocomplete = pikkuSessionlessFunc({
  description: "List autocomplete commands in the team.\n##### Permissions\n`view_team` for the team.",
  input: ListTeamsCommandsAutocompleteInput,
  output: ListTeamsCommandsAutocompleteOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/teams/{team_id}/commands/autocomplete", data) as any
  },
})
