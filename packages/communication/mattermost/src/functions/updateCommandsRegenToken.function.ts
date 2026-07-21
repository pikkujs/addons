// commands — Endpoints for creating, getting and updating slash commands.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const UpdateCommandsRegenTokenInput = z.object({
  command_id: z.string().describe("ID of the command to generate the new token"),
})

export const UpdateCommandsRegenTokenOutput = z.object({
  token: z.string().optional().describe("The new token"),
})

export const updateCommandsRegenToken = pikkuSessionlessFunc({
  description: "Generate a new token for the command based on command id string.\n##### Permissions\nMust have `manage_slash_commands` permission for the team the command is in.",
  input: UpdateCommandsRegenTokenInput,
  output: UpdateCommandsRegenTokenOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/commands/{command_id}/regen_token", data) as any
  },
})
