// commands — Endpoints for creating, getting and updating slash commands.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateCommandsInput = z.object({
  team_id: z.string().describe("Team ID to where the command should be created"),
  method: z.string().describe("`'P'` for post request, `'G'` for get request"),
  trigger: z.string().describe("Activation word to trigger the command"),
  url: z.string().describe("The URL that the command will make the request"),
})

export const CreateCommandsOutput = z.object({
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
})

export const createCommands = pikkuSessionlessFunc({
  description: "Create a command for a team.\n##### Permissions\n`manage_slash_commands` for the team the command is in.",
  input: CreateCommandsInput,
  output: CreateCommandsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/commands", data) as any
  },
})
