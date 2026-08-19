// Users — This resource represent users. Use it to: * get, get a list of, create, and delete users. * get, set, and reset a user's default issue table columns. * get a list of the groups the user belongs to. * get a list of user account IDs for a list of usernames or user keys.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError, ConflictError } from '@pikku/core/errors'

export const GetAllUsersDefaultInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return."),
})

export const GetAllUsersDefaultOutput = z.array(z.object({
  accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests."),
  accountType: z.enum(["atlassian", "app", "customer", "unknown"]).optional().describe("The user account type. Can take the following values:\n\n *  `atlassian` regular Atlassian user account\n *  `app` system account used for Connect applications and OAuth to represent external systems\n *  `customer` Jira Service Desk account representing an external service desk"),
  active: z.boolean().optional().describe("Whether the user is active."),
  applicationRoles: z.object({
    callback: z.record(z.string(), z.unknown()).optional(),
    items: z.array(z.object({
      defaultGroups: z.array(z.string()).optional().describe("The groups that are granted default access for this application role. As a group's name can change, use of `defaultGroupsDetails` is recommended to identify a groups."),
      defaultGroupsDetails: z.array(z.object({
        groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
        name: z.string().optional().describe("The name of group."),
        self: z.string().url().optional().describe("The URL for these group details."),
      })).optional().describe("The groups that are granted default access for this application role."),
      defined: z.boolean().optional().describe("Deprecated."),
      groupDetails: z.array(z.object({
        groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
        name: z.string().optional().describe("The name of group."),
        self: z.string().url().optional().describe("The URL for these group details."),
      })).optional().describe("The groups associated with the application role."),
      groups: z.array(z.string()).optional().describe("The groups associated with the application role. As a group's name can change, use of `groupDetails` is recommended to identify a groups."),
      hasUnlimitedSeats: z.boolean().optional(),
      key: z.string().optional().describe("The key of the application role."),
      name: z.string().optional().describe("The display name of the application role."),
      numberOfSeats: z.number().int().optional().describe("The maximum count of users on your license."),
      platform: z.boolean().optional().describe("Indicates if the application role belongs to Jira platform (`jira-core`)."),
      remainingSeats: z.number().int().optional().describe("The count of users remaining on your license."),
      selectedByDefault: z.boolean().optional().describe("Determines whether this application role should be selected by default on user creation."),
      userCount: z.number().int().optional().describe("The number of users counting against your license."),
      userCountDescription: z.string().optional().describe("The [type of users](https://confluence.atlassian.com/x/lRW3Ng) being counted against your license."),
    })).optional(),
    "max-results": z.number().int().optional(),
    pagingCallback: z.record(z.string(), z.unknown()).optional(),
    size: z.number().int().optional(),
  }).optional().describe("The application roles the user is assigned to."),
  avatarUrls: z.object({
    "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
    "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
    "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
    "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
  }).optional().describe("The avatars of the user."),
  displayName: z.string().optional().describe("The display name of the user. Depending on the user’s privacy setting, this may return an alternative value."),
  emailAddress: z.string().optional().describe("The email address of the user. Depending on the user’s privacy setting, this may be returned as null."),
  expand: z.string().optional().describe("Expand options that include additional user details in the response."),
  groups: z.object({
    callback: z.record(z.string(), z.unknown()).optional(),
    items: z.array(z.object({
      groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
      name: z.string().optional().describe("The name of group."),
      self: z.string().url().optional().describe("The URL for these group details."),
    })).optional(),
    "max-results": z.number().int().optional(),
    pagingCallback: z.record(z.string(), z.unknown()).optional(),
    size: z.number().int().optional(),
  }).optional().describe("The groups that the user belongs to."),
  key: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  locale: z.string().optional().describe("The locale of the user. Depending on the user’s privacy setting, this may be returned as null."),
  name: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  self: z.string().url().optional().describe("The URL of the user."),
  timeZone: z.string().optional().describe("The time zone specified in the user's profile. Depending on the user’s privacy setting, this may be returned as null."),
}))

export const getAllUsersDefault = pikkuSessionlessFunc({
  description: "Returns a list of all users, including active users, inactive users and previously deleted users that have an Atlassian account.\n\nPrivacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the [Profile visibility overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.\n\n**[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetAllUsersDefaultInput,
  output: GetAllUsersDefaultOutput,
  errors: [BadRequestError, ForbiddenError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/users", data) as any
  },
})
