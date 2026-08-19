// User search — This resource represents various ways to search for and find users. Use it to obtain list of users including users assignable to projects and issues, users with permissions, user lists for pickup fields, and user lists generated using structured queries. Note that the operations in this resource only return users found within the first 1000 users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, TooManyRequestsError } from '@pikku/core/errors'

export const FindUsersInput = z.object({
  query: z.string().optional().describe("A query string that is matched against user attributes ( `displayName`, and `emailAddress`) to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` or `property` is specified."),
  username: z.string().optional(),
  accountId: z.string().max(128).optional().describe("A query string that is matched exactly against a user `accountId`. Required, unless `query` or `property` is specified."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of filtered results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
  property: z.string().optional().describe("A query string used to search properties. Property keys are specified by path, so property keys containing dot (.) or equals (=) characters cannot be used. The query string cannot be specified using a JSON object. Example: To search for the value of `nested` from `{\"something\":{\"nested\":1,\"other\":2}}` use `thepropertykey.something.nested=1`. Required, unless `accountId` or `query` is specified."),
})

export const FindUsersOutput = z.array(z.object({
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

export const findUsers = pikkuSessionlessFunc({
  description: "Returns a list of users that match the search string and property.\n\nThis operation first applies a filter to match the search string and property, and then takes the filtered users in the range defined by `startAt` and `maxResults`, up to the thousandth user. To get all the users who match the search string and property, use [Get all users](#api-rest-api-3-users-search-get) and filter the records in your code.\n\nThis operation can be accessed anonymously.\n\nPrivacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the [Profile visibility overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.\n\n**[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls or calls by users without the required permission return empty search results.",
  input: FindUsersInput,
  output: FindUsersOutput,
  errors: [BadRequestError, UnauthorizedError, TooManyRequestsError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/user/search", data) as any
  },
})
