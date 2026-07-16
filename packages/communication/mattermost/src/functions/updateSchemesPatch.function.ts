// schemes — Endpoints for creating, getting and updating and deleting schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateSchemesPatchInput = z.object({
  scheme_id: z.string().describe("Scheme GUID"),
  name: z.string().optional().describe("The human readable name of the scheme"),
  description: z.string().optional().describe("The description of the scheme"),
})

export const UpdateSchemesPatchOutput = z.object({
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

export const updateSchemesPatch = pikkuSessionlessFunc({
  description: "Partially update a scheme by providing only the fields you want to update. Omitted fields will not be updated. The fields that can be updated are defined in the request body, all other provided fields will be ignored.\n\n##### Permissions\n`manage_system` permission is required.\n\n__Minimum server version__: 5.0",
  input: UpdateSchemesPatchInput,
  output: UpdateSchemesPatchOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/schemes/{scheme_id}/patch", data) as any
  },
})
