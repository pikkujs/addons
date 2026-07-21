// commands — Endpoints for creating, getting and updating slash commands.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteCommandInput = z.object({
  command_id: z.string().describe("ID of the command to delete"),
})

export const DeleteCommandOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deleteCommand = pikkuSessionlessFunc({
  description: "Delete a command based on command id string.\n##### Permissions\nMust have `manage_slash_commands` permission for the team the command is in.",
  input: DeleteCommandInput,
  output: DeleteCommandOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/commands/{command_id}", data) as any
  },
})
