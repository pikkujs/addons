// roles — Endpoints for creating, getting and updating roles.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetRoleInput = z.object({
  role_id: z.string().describe("Role GUID"),
})

export const GetRoleOutput = z.object({
  id: z.string().optional().describe("The unique identifier of the role."),
  name: z.string().optional().describe("The unique name of the role, used when assigning roles to users/groups in contexts."),
  display_name: z.string().optional().describe("The human readable name for the role."),
  description: z.string().optional().describe("A human readable description of the role."),
  permissions: z.array(z.string()).optional().describe("A list of the unique names of the permissions this role grants."),
  scheme_managed: z.boolean().optional().describe("indicates if this role is managed by a scheme (true), or is a custom stand-alone role (false)."),
})

export const getRole = pikkuSessionlessFunc({
  description: "Get a role from the provided role id.\n\n##### Permissions\nRequires an active session but no other permissions.\n\n__Minimum server version__: 4.9",
  input: GetRoleInput,
  output: GetRoleOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("GET", "/roles/{role_id}", data) as any
  },
})
