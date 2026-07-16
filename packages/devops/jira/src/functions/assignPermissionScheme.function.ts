// Project permission schemes — This resource represents permission schemes for a project. Use this resource to: * get details of a project's issue security levels available to the calling user. * get the permission scheme associated with the project or assign different permission scheme to the project. * get details of a project's issue security scheme. See [Managing project permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AssignPermissionSchemeInput = z.object({
  projectKeyOrId: z.string().describe("The project ID or project key (case sensitive)."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."),
  id: z.number().int().describe("The ID of the permission scheme to associate with the project. Use the [Get all permission schemes](#api-rest-api-3-permissionscheme-get) resource to get a list of permission scheme IDs."),
})

export const AssignPermissionSchemeOutput = z.object({
  description: z.string().optional().describe("A description for the permission scheme."),
  expand: z.string().optional().describe("The expand options available for the permission scheme."),
  id: z.number().int().optional().describe("The ID of the permission scheme."),
  name: z.string().describe("The name of the permission scheme. Must be unique."),
  permissions: z.array(z.object({
    holder: z.object({
      expand: z.string().optional().describe("Expand options that include additional permission holder details in the response."),
      parameter: z.string().optional().describe("As a group's name can change, use of `value` is recommended. The identifier associated withthe `type` value that defines the holder of the permission."),
      type: z.string().describe("The type of permission holder."),
      value: z.string().optional().describe("The identifier associated with the `type` value that defines the holder of the permission."),
    }).optional().describe("The user or group being granted the permission. It consists of a `type`, a type-dependent `parameter` and a type-dependent `value`. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information."),
    id: z.number().int().optional().describe("The ID of the permission granted details."),
    permission: z.string().optional().describe("The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See [Built-in permissions](../api-group-permission-schemes/#built-in-permissions) in *Get all permission schemes* for more information about the built-in permissions. See the [project permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information about custom permissions."),
    self: z.string().url().optional().describe("The URL of the permission granted details."),
  })).optional().describe("The permission scheme to create or update. See [About permission schemes and grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more information."),
  scope: z.object({
    project: z.object({
      avatarUrls: z.object({
        "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
        "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
        "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
        "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
      }).optional().describe("The URLs of the project's avatars."),
      id: z.string().optional().describe("The ID of the project."),
      key: z.string().optional().describe("The key of the project."),
      name: z.string().optional().describe("The name of the project."),
      projectCategory: z.object({
        description: z.string().optional().describe("The name of the project category."),
        id: z.string().optional().describe("The ID of the project category."),
        name: z.string().optional().describe("The description of the project category."),
        self: z.string().optional().describe("The URL of the project category."),
      }).optional().describe("The category the project belongs to."),
      projectTypeKey: z.enum(["software", "service_desk", "business"]).optional().describe("The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project."),
      self: z.string().optional().describe("The URL of the project details."),
      simplified: z.boolean().optional().describe("Whether or not the project is simplified."),
    }).optional().describe("The project the item has scope in."),
    type: z.enum(["PROJECT", "TEMPLATE"]).optional().describe("The type of scope."),
  }).optional().describe("The scope of the permission scheme."),
  self: z.string().url().optional().describe("The URL of the permission scheme."),
}).describe("Details of a permission scheme.")

export const assignPermissionScheme = pikkuSessionlessFunc({
  description: "Assigns a permission scheme with a project. See [Managing project permissions](https://confluence.atlassian.com/x/yodKLg) for more information about permission schemes.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)",
  input: AssignPermissionSchemeInput,
  output: AssignPermissionSchemeOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/project/{projectKeyOrId}/permissionscheme", data) as any
  },
})
