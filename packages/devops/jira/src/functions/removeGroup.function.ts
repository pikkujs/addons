// Groups — This resource represents groups of users. Use it to get, create, find, and delete groups as well as add and remove users from groups. (\[WARNING\] The standard Atlassian group names are default names only and can be edited or deleted. For example, an admin or Atlassian support could delete the default group jira-software-users or rename it to jsw-users at any point. See https://support.atlassian.com/user-management/docs/create-and-update-groups/ for details.)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const RemoveGroupInput = z.object({
  groupname: z.string().optional(),
  groupId: z.string().optional().describe("The ID of the group. This parameter cannot be used with the `groupname` parameter."),
  swapGroup: z.string().optional().describe("As a group's name can change, use of `swapGroupId` is recommended to identify a group.  \nThe group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroupId` parameter."),
  swapGroupId: z.string().optional().describe("The ID of the group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroup` parameter."),
})

export const removeGroup = pikkuSessionlessFunc({
  description: "Deletes a group.\n\n**[Permissions](#permissions) required:** Site administration (that is, member of the *site-admin* strategic [group](https://confluence.atlassian.com/x/24xjL)).",
  input: RemoveGroupInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/group", data)
  },
})
