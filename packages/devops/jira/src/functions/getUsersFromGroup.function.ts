// Groups — This resource represents groups of users. Use it to get, create, find, and delete groups as well as add and remove users from groups. (\[WARNING\] The standard Atlassian group names are default names only and can be edited or deleted. For example, an admin or Atlassian support could delete the default group jira-software-users or rename it to jsw-users at any point. See https://support.atlassian.com/user-management/docs/create-and-update-groups/ for details.)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetUsersFromGroupInput = z.object({
  groupname: z.string().optional().describe("As a group's name can change, use of `groupId` is recommended to identify a group.  \nThe name of the group. This parameter cannot be used with the `groupId` parameter."),
  groupId: z.string().optional().describe("The ID of the group. This parameter cannot be used with the `groupName` parameter."),
  includeInactiveUsers: z.boolean().optional().default(false).describe("Include inactive users."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
})

export const GetUsersFromGroupOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
    accountType: z.string().optional().describe("The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user)"),
    active: z.boolean().optional().describe("Whether the user is active."),
    avatarUrls: z.object({
      "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
      "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
      "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
      "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
    }).optional().describe("The avatars of the user."),
    displayName: z.string().optional().describe("The display name of the user. Depending on the user’s privacy settings, this may return an alternative value."),
    emailAddress: z.string().optional().describe("The email address of the user. Depending on the user’s privacy settings, this may be returned as null."),
    key: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
    name: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
    self: z.string().optional().describe("The URL of the user."),
    timeZone: z.string().optional().describe("The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getUsersFromGroup = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of all users in a group.\n\nNote that users are ordered by username, however the username is not returned in the results due to privacy reasons.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetUsersFromGroupInput,
  output: GetUsersFromGroupOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/group/member", data) as any
  },
})
