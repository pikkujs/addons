// Filter sharing — This resource represents options for sharing [filters](#api-group-Filters). Use it to get share scopes as well as add and remove share scopes from filters.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetSharePermissionInput = z.object({
  id: z.number().int().describe("The ID of the filter."),
  permissionId: z.number().int().describe("The ID of the share permission."),
})

export const GetSharePermissionOutput = z.any()

export const getSharePermission = pikkuSessionlessFunc({
  description: "Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None, however, a share permission is only returned for:\n\n *  filters owned by the user.\n *  filters shared with a group that the user is a member of.\n *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.\n *  filters shared with a public project.\n *  filters shared with the public.",
  input: GetSharePermissionInput,
  output: GetSharePermissionOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/filter/{id}/permission/{permissionId}", data) as any
  },
})
