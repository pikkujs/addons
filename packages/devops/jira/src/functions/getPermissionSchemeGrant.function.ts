// Permission schemes — This resource represents permission schemes. Use it to get, create, update, and delete permission schemes as well as get, create, update, and delete details of the permissions granted in those schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetPermissionSchemeGrantInput = z.object({
  schemeId: z.number().int().describe("The ID of the permission scheme."),
  permissionId: z.number().int().describe("The ID of the permission grant."),
  expand: z.string().optional().describe("Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."),
})

export const GetPermissionSchemeGrantOutput = z.object({
  holder: z.object({
    expand: z.string().optional().describe("Expand options that include additional permission holder details in the response."),
    parameter: z.string().optional().describe("As a group's name can change, use of `value` is recommended. The identifier associated withthe `type` value that defines the holder of the permission."),
    type: z.string().describe("The type of permission holder."),
    value: z.string().optional().describe("The identifier associated with the `type` value that defines the holder of the permission."),
  }).optional().describe("The user or group being granted the permission. It consists of a `type`, a type-dependent `parameter` and a type-dependent `value`. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information."),
  id: z.number().int().optional().describe("The ID of the permission granted details."),
  permission: z.string().optional().describe("The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See [Built-in permissions](../api-group-permission-schemes/#built-in-permissions) in *Get all permission schemes* for more information about the built-in permissions. See the [project permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information about custom permissions."),
  self: z.string().url().optional().describe("The URL of the permission granted details."),
}).describe("Details about a permission granted to a user or group.")

export const getPermissionSchemeGrant = pikkuSessionlessFunc({
  description: "Returns a permission grant.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetPermissionSchemeGrantInput,
  output: GetPermissionSchemeGrantOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/permissionscheme/{schemeId}/permission/{permissionId}", data) as any
  },
})
