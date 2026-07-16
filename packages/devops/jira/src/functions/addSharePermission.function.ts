// Filter sharing — This resource represents options for sharing [filters](#api-group-Filters). Use it to get share scopes as well as add and remove share scopes from filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const AddSharePermissionInput = z.object({
  id: z.number().int().describe("The ID of the filter."),
  accountId: z.string().optional().describe("The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user."),
  groupId: z.string().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products.For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. Cannot be provided with `groupname`."),
  groupname: z.string().optional().describe("The name of the group to share the filter with. Set `type` to `group`. Please note that the name of a group is mutable, to reliably identify a group use `groupId`."),
  projectId: z.string().optional().describe("The ID of the project to share the filter with. Set `type` to `project`."),
  projectRoleId: z.string().optional().describe("The ID of the project role to share the filter with. Set `type` to `projectRole` and the `projectId` for the project that the role is in."),
  rights: z.number().int().optional().describe("The rights for the share permission."),
  type: z.enum(["user", "project", "group", "projectRole", "global", "authenticated"]).describe("The type of the share permission.Specify the type as follows:\n\n *  `user` Share with a user.\n *  `group` Share with a group. Specify `groupname` as well.\n *  `project` Share with a project. Specify `projectId` as well.\n *  `projectRole` Share with a project role in a project. Specify `projectId` and `projectRoleId` as well.\n *  `global` Share globally, including anonymous users. If set, this type overrides all existing share permissions and must be deleted before any non-global share permissions is set.\n *  `authenticated` Share with all logged-in users. This shows as `loggedin` in the response. If set, this type overrides all existing share permissions and must be deleted before any non-global share permissions is set."),
})

export const AddSharePermissionOutput = z.any()

export const addSharePermission = pikkuSessionlessFunc({
  description: "Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the public) it will overwrite all share permissions for the filter.\n\nBe aware that this operation uses different objects for updating share permissions compared to [Update filter](#api-rest-api-3-filter-id-put).\n\n**[Permissions](#permissions) required:** *Share dashboards and filters* [global permission](https://confluence.atlassian.com/x/x4dKLg) and the user must own the filter.",
  input: AddSharePermissionInput,
  output: AddSharePermissionOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/filter/{id}/permission", data) as any
  },
})
