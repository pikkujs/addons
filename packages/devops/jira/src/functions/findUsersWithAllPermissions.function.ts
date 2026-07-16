// User search — This resource represents various ways to search for and find users. Use it to obtain list of users including users assignable to projects and issues, users with permissions, user lists for pickup fields, and user lists generated using structured queries. Note that the operations in this resource only return users found within the first 1000 users.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, TooManyRequestsError } from '@pikku/core/errors'

export const FindUsersWithAllPermissionsInput = z.object({
  query: z.string().optional().describe("A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified."),
  username: z.string().optional().describe("This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  accountId: z.string().max(128).optional().describe("A query string that is matched exactly against user `accountId`. Required, unless `query` is specified."),
  permissions: z.string().describe("A comma separated list of permissions. Permissions can be specified as any:\n\n *  permission returned by [Get all permissions](#api-rest-api-3-permissions-get).\n *  custom project permission added by Connect apps.\n *  (deprecated) one of the following:\n    \n     *  ASSIGNABLE\\_USER\n     *  ASSIGN\\_ISSUE\n     *  ATTACHMENT\\_DELETE\\_ALL\n     *  ATTACHMENT\\_DELETE\\_OWN\n     *  BROWSE\n     *  CLOSE\\_ISSUE\n     *  COMMENT\\_DELETE\\_ALL\n     *  COMMENT\\_DELETE\\_OWN\n     *  COMMENT\\_EDIT\\_ALL\n     *  COMMENT\\_EDIT\\_OWN\n     *  COMMENT\\_ISSUE\n     *  CREATE\\_ATTACHMENT\n     *  CREATE\\_ISSUE\n     *  DELETE\\_ISSUE\n     *  EDIT\\_ISSUE\n     *  LINK\\_ISSUE\n     *  MANAGE\\_WATCHER\\_LIST\n     *  MODIFY\\_REPORTER\n     *  MOVE\\_ISSUE\n     *  PROJECT\\_ADMIN\n     *  RESOLVE\\_ISSUE\n     *  SCHEDULE\\_ISSUE\n     *  SET\\_ISSUE\\_SECURITY\n     *  TRANSITION\\_ISSUE\n     *  VIEW\\_VERSION\\_CONTROL\n     *  VIEW\\_VOTERS\\_AND\\_WATCHERS\n     *  VIEW\\_WORKFLOW\\_READONLY\n     *  WORKLOG\\_DELETE\\_ALL\n     *  WORKLOG\\_DELETE\\_OWN\n     *  WORKLOG\\_EDIT\\_ALL\n     *  WORKLOG\\_EDIT\\_OWN\n     *  WORK\\_ISSUE"),
  issueKey: z.string().optional().describe("The issue key for the issue."),
  projectKey: z.string().optional().describe("The project key for the project (case sensitive)."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
})

export const FindUsersWithAllPermissionsOutput = z.array(z.object({
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

export const findUsersWithAllPermissions = pikkuSessionlessFunc({
  description: "Returns a list of users who fulfill these criteria:\n\n *  their user attributes match a search string.\n *  they have a set of permissions for a project or issue.\n\nIf no search string is provided, a list of all users with the permissions is returned.\n\nThis operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and then returns only the users from that range that match the search string and have permission for the project or issue. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users who match the search string and have permission for the project or issue, use [Get all users](#api-rest-api-3-users-search-get) and filter the records in your code.\n\nPrivacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the [Profile visibility overview](https://developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to get users for any project.\n *  *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project, to get users for that project.",
  input: FindUsersWithAllPermissionsInput,
  output: FindUsersWithAllPermissionsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, TooManyRequestsError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/user/permission/search", data) as any
  },
})
