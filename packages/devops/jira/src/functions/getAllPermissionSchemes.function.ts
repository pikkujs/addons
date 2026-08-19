// Permission schemes — This resource represents permission schemes. Use it to get, create, update, and delete permission schemes as well as get, create, update, and delete details of the permissions granted in those schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetAllPermissionSchemesInput = z.object({
  expand: z.string().optional().describe("Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."),
})

export const GetAllPermissionSchemesOutput = z.object({
  permissionSchemes: z.array(z.object({
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
  })).optional().describe("Permission schemes list."),
}).describe("List of all permission schemes.")

export const getAllPermissionSchemes = pikkuSessionlessFunc({
  description: "Returns all permission schemes.\n\n### About permission schemes and grants ###\n\nA permission scheme is a collection of permission grants. A permission grant consists of a `holder` and a `permission`.\n\n#### Holder object ####\n\nThe `holder` object contains information about the user or group being granted the permission. For example, the *Administer projects* permission is granted to a group named *Teams in space administrators*. In this case, the type is `\"type\": \"group\"`, and the parameter is the group name, `\"parameter\": \"Teams in space administrators\"` and the value is group ID, `\"value\": \"ca85fac0-d974-40ca-a615-7af99c48d24f\"`. The `holder` object is defined by the following properties:\n\n *  `type` Identifies the user or group (see the list of types below).\n *  `parameter` As a group's name can change, use of `value` is recommended. The value of this property depends on the `type`. For example, if the `type` is a group, then you need to specify the group name.\n *  `value` The value of this property depends on the `type`. If the `type` is a group, then you need to specify the group ID. For other `type` it has the same value as `parameter`\n\nThe following `types` are available. The expected values for `parameter` and `value` are given in parentheses (some types may not have a `parameter` or `value`):\n\n *  `anyone` Grant for anonymous users.\n *  `applicationRole` Grant for users with access to the specified application (application name, application name). See [Update product access settings](https://confluence.atlassian.com/x/3YxjL) for more information.\n *  `assignee` Grant for the user currently assigned to an issue.\n *  `group` Grant for the specified group (`parameter` : group name, `value` : group ID).\n *  `groupCustomField` Grant for a user in the group selected in the specified custom field (`parameter` : custom field ID, `value` : custom field ID).\n *  `projectLead` Grant for a project lead.\n *  `projectRole` Grant for the specified project role (`parameter` :project role ID, `value` : project role ID).\n *  `reporter` Grant for the user who reported the issue.\n *  `sd.customer.portal.only` Jira Service Desk only. Grants customers permission to access the customer portal but not Jira. See [Customizing Jira Service Desk permissions](https://confluence.atlassian.com/x/24dKLg) for more information.\n *  `user` Grant for the specified user (`parameter` : user ID - historically this was the userkey but that is deprecated and the account ID should be used, `value` : user ID).\n *  `userCustomField` Grant for a user selected in the specified custom field (`parameter` : custom field ID, `value` : custom field ID).\n\n#### Built-in permissions ####\n\nThe [built-in Jira permissions](https://confluence.atlassian.com/x/yodKLg) are listed below. Apps can also define custom permissions. See the [project permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information.\n\n**Project permissions**\n\n *  `ADMINISTER_PROJECTS`\n *  `BROWSE_PROJECTS`\n *  `MANAGE_SPRINTS_PERMISSION` (Jira Software only)\n *  `SERVICEDESK_AGENT` (Jira Service Desk only)\n *  `VIEW_DEV_TOOLS` (Jira Software only)\n *  `VIEW_READONLY_WORKFLOW`\n\n**Issue permissions**\n\n *  `ASSIGNABLE_USER`\n *  `ASSIGN_ISSUES`\n *  `CLOSE_ISSUES`\n *  `CREATE_ISSUES`\n *  `DELETE_ISSUES`\n *  `EDIT_ISSUES`\n *  `LINK_ISSUES`\n *  `MODIFY_REPORTER`\n *  `MOVE_ISSUES`\n *  `RESOLVE_ISSUES`\n *  `SCHEDULE_ISSUES`\n *  `SET_ISSUE_SECURITY`\n *  `TRANSITION_ISSUES`\n\n**Voters and watchers permissions**\n\n *  `MANAGE_WATCHERS`\n *  `VIEW_VOTERS_AND_WATCHERS`\n\n**Comments permissions**\n\n *  `ADD_COMMENTS`\n *  `DELETE_ALL_COMMENTS`\n *  `DELETE_OWN_COMMENTS`\n *  `EDIT_ALL_COMMENTS`\n *  `EDIT_OWN_COMMENTS`\n\n**Attachments permissions**\n\n *  `CREATE_ATTACHMENTS`\n *  `DELETE_ALL_ATTACHMENTS`\n *  `DELETE_OWN_ATTACHMENTS`\n\n**Time tracking permissions**\n\n *  `DELETE_ALL_WORKLOGS`\n *  `DELETE_OWN_WORKLOGS`\n *  `EDIT_ALL_WORKLOGS`\n *  `EDIT_OWN_WORKLOGS`\n *  `WORK_ON_ISSUES`\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetAllPermissionSchemesInput,
  output: GetAllPermissionSchemesOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/permissionscheme", data) as any
  },
})
