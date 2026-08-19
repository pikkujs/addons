// Myself — This resource represents information about the current user, such as basic details, group membership, application roles, preferences, and locale. Use it to get, create, update, and delete (restore default) values of the user's preferences and locale.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetCurrentUserInput = z.object({
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about user in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `groups` Returns all groups, including nested groups, the user belongs to.\n *  `applicationRoles` Returns the application roles the user is assigned to."),
})

export const GetCurrentUserOutput = z.object({
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
}).describe("A user with details as permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:\n\n *  User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case, `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).\n *  User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.\n *  User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have fallback values.")

export const getCurrentUser = pikkuSessionlessFunc({
  description: "Returns details for the current user.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetCurrentUserInput,
  output: GetCurrentUserOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/myself", data) as any
  },
})
