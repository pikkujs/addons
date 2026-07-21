// roles — Endpoints for creating, getting and updating roles.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateRolesPatchInput = z.object({
  role_id: z.string().describe("Role GUID"),
  permissions: z.array(z.string()).optional().describe("The permissions the role should grant."),
})

export const UpdateRolesPatchOutput = z.object({
  id: z.string().optional().describe("The unique identifier of the role."),
  name: z.string().optional().describe("The unique name of the role, used when assigning roles to users/groups in contexts."),
  display_name: z.string().optional().describe("The human readable name for the role."),
  description: z.string().optional().describe("A human readable description of the role."),
  permissions: z.array(z.string()).optional().describe("A list of the unique names of the permissions this role grants."),
  scheme_managed: z.boolean().optional().describe("indicates if this role is managed by a scheme (true), or is a custom stand-alone role (false)."),
})

export const updateRolesPatch = pikkuSessionlessFunc({
  description: "Partially update a role by providing only the fields you want to update. Omitted fields will not be updated. The fields that can be updated are defined in the request body, all other provided fields will be ignored.\n\n##### Permissions\n`manage_system` permission is required.\n\n__Minimum server version__: 4.9",
  input: UpdateRolesPatchInput,
  output: UpdateRolesPatchOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("PUT", "/roles/{role_id}/patch", data) as any
  },
})
