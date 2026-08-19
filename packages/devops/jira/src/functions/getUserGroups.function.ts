// Users — This resource represent users. Use it to: * get, get a list of, create, and delete users. * get, set, and reset a user's default issue table columns. * get a list of the groups the user belongs to. * get a list of user account IDs for a list of usernames or user keys.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetUserGroupsInput = z.object({
  accountId: z.string().max(128).describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
  username: z.string().optional().describe("This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  key: z.string().optional().describe("This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
})

export const GetUserGroupsOutput = z.array(z.object({
  groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
  name: z.string().optional().describe("The name of group."),
  self: z.string().url().optional().describe("The URL for these group details."),
}))

export const getUserGroups = pikkuSessionlessFunc({
  description: "Returns the groups to which a user belongs.\n\n**[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetUserGroupsInput,
  output: GetUserGroupsOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/user/groups", data) as any
  },
})
