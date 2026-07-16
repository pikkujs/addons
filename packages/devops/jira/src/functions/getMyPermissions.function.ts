// Permissions — This resource represents permissions. Use it to obtain details of all permissions and determine whether the user has certain permissions.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetMyPermissionsInput = z.object({
  projectKey: z.string().optional().describe("The key of project. Ignored if `projectId` is provided."),
  projectId: z.string().optional().describe("The ID of project."),
  issueKey: z.string().optional().describe("The key of the issue. Ignored if `issueId` is provided."),
  issueId: z.string().optional().describe("The ID of the issue."),
  permissions: z.string().optional().describe("A list of permission keys. (Required) This parameter accepts a comma-separated list. To get the list of available permissions, use [Get all permissions](#api-rest-api-3-permissions-get)."),
  projectUuid: z.string().optional(),
  projectConfigurationUuid: z.string().optional(),
  commentId: z.string().optional().describe("The ID of the comment."),
})

export const GetMyPermissionsOutput = z.object({
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

export const getMyPermissions = pikkuSessionlessFunc({
  description: "Returns a list of permissions indicating which permissions the user has. Details of the user's permissions can be obtained in a global, project, issue or comment context.\n\nThe user is reported as having a project permission:\n\n *  in the global context, if the user has the project permission in any project.\n *  for a project, where the project permission is determined using issue data, if the user meets the permission's criteria for any issue in the project. Otherwise, if the user has the project permission in the project.\n *  for an issue, where a project permission is determined using issue data, if the user has the permission in the issue. Otherwise, if the user has the project permission in the project containing the issue.\n *  for a comment, where the user has both the permission to browse the comment and the project permission for the comment's parent issue. Only the BROWSE\\_PROJECTS permission is supported. If a `commentId` is provided whose `permissions` does not equal BROWSE\\_PROJECTS, a 400 error will be returned.\n\nThis means that users may be shown as having an issue permission (such as EDIT\\_ISSUES) in the global context or a project context but may not have the permission for any or all issues. For example, if Reporters have the EDIT\\_ISSUES permission a user would be shown as having this permission in the global context or the context of a project, because any user can be a reporter. However, if they are not the user who reported the issue queried they would not have EDIT\\_ISSUES permission for that issue.\n\nGlobal permissions are unaffected by context.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetMyPermissionsInput,
  output: GetMyPermissionsOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/mypermissions", data) as any
  },
})
