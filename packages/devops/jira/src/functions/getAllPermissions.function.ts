// Permissions — This resource represents permissions. Use it to obtain details of all permissions and determine whether the user has certain permissions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAllPermissionsOutput = z.object({
  permissions: z.record(z.string(), z.object({
    deprecatedKey: z.boolean().optional().describe("Indicate whether the permission key is deprecated. Note that deprecated keys cannot be used in the `permissions parameter of Get my permissions. Deprecated keys are not returned by Get all permissions.`"),
    description: z.string().optional().describe("The description of the permission."),
    havePermission: z.boolean().optional().describe("Whether the permission is available to the user in the queried context."),
    id: z.string().optional().describe("The ID of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions."),
    key: z.string().optional().describe("The key of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions."),
    name: z.string().optional().describe("The name of the permission."),
    type: z.enum(["GLOBAL", "PROJECT"]).optional().describe("The type of the permission."),
  }).describe("Details of a permission and its availability to a user.")).optional().describe("List of permissions."),
}).describe("Details about permissions.")

export const getAllPermissions = pikkuSessionlessFunc({
  description: "Returns all permissions, including:\n\n *  global permissions.\n *  project permissions.\n *  global permissions added by plugins.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetAllPermissionsOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/permissions") as any
  },
})
