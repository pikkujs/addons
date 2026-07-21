// Permissions — This resource represents permissions. Use it to obtain details of all permissions and determine whether the user has certain permissions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const GetBulkPermissionsInput = z.object({
  accountId: z.string().optional().describe("The account ID of a user."),
  globalPermissions: z.array(z.string()).optional().describe("Global permissions to look up."),
  projectPermissions: z.array(z.object({
  issues: z.array(z.number().int()).optional().describe("List of issue IDs."),
  permissions: z.array(z.string()).describe("List of project permissions."),
  projects: z.array(z.number().int()).optional().describe("List of project IDs."),
})).optional().describe("Project permissions with associated projects and issues to look up."),
})

export const GetBulkPermissionsOutput = z.object({
  globalPermissions: z.array(z.string()).describe("List of permissions granted to the user."),
  projectPermissions: z.array(z.object({
    issues: z.array(z.number().int()).describe("IDs of the issues the user has the permission for."),
    permission: z.string().describe("A project permission,"),
    projects: z.array(z.number().int()).describe("IDs of the projects the user has the permission for."),
  })).describe("List of project permissions and the projects and issues those permissions provide access to."),
}).describe("Details of global and project permissions granted to the user.")

export const getBulkPermissions = pikkuSessionlessFunc({
  description: "Returns:\n\n *  for a list of global permissions, the global permissions granted to a user.\n *  for a list of project permissions and lists of projects and issues, for each project permission a list of the projects and issues a user can access or manipulate.\n\nIf no account ID is provided, the operation returns details for the logged in user.\n\nNote that:\n\n *  Invalid project and issue IDs are ignored.\n *  A maximum of 1000 projects and 1000 issues can be checked.\n *  Null values in `globalPermissions`, `projectPermissions`, `projectPermissions.projects`, and `projectPermissions.issues` are ignored.\n *  Empty strings in `projectPermissions.permissions` are ignored.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) to check the permissions for other users, otherwise none. However, Connect apps can make a call from the app server to the product to obtain permission details for any user, without admin permission. This Connect app ability doesn't apply to calls made using AP.request() in a browser.",
  input: GetBulkPermissionsInput,
  output: GetBulkPermissionsOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/permissions/check", data) as any
  },
})
