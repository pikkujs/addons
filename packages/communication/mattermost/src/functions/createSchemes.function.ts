// schemes — Endpoints for creating, getting and updating and deleting schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateSchemesInput = z.object({
  name: z.string().describe("The name of the scheme"),
  description: z.string().optional().describe("The description of the scheme"),
  scope: z.string().describe("The scope of the scheme (\"team\" or \"channel\")"),
})

export const CreateSchemesOutput = z.object({
  id: z.string().optional().describe("The unique identifier of the scheme."),
  name: z.string().optional().describe("The human readable name for the scheme."),
  description: z.string().optional().describe("A human readable description of the scheme."),
  create_at: z.number().int().optional().describe("The time at which the scheme was created."),
  update_at: z.number().int().optional().describe("The time at which the scheme was last updated."),
  delete_at: z.number().int().optional().describe("The time at which the scheme was deleted."),
  scope: z.string().optional().describe("The scope to which this scheme can be applied, either \"team\" or \"channel\"."),
  default_team_admin_role: z.string().optional().describe("The id of the default team admin role for this scheme."),
  default_team_user_role: z.string().optional().describe("The id of the default team user role for this scheme."),
  default_channel_admin_role: z.string().optional().describe("The id of the default channel admin role for this scheme."),
  default_channel_user_role: z.string().optional().describe("The id of the default channel user role for this scheme."),
})

export const createSchemes = pikkuSessionlessFunc({
  description: "Create a new scheme.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 5.0",
  input: CreateSchemesInput,
  output: CreateSchemesOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/schemes", data) as any
  },
})
