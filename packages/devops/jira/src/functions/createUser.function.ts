// Users — This resource represent users. Use it to: * get, get a list of, create, and delete users. * get, set, and reset a user's default issue table columns. * get a list of the groups the user belongs to. * get a list of user account IDs for a list of usernames or user keys.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateUserInput = z.object({
  applicationKeys: z.array(z.string()).optional().describe("Deprecated, do not use."),
  displayName: z.string().optional().describe("This property is no longer available. If the user has an Atlassian account, their display name is not changed. If the user does not have an Atlassian account, they are sent an email asking them set up an account."),
  emailAddress: z.string().describe("The email address for the user."),
  key: z.string().optional().describe("This property is no longer available. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  name: z.string().optional().describe("This property is no longer available. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
  password: z.string().optional().describe("This property is no longer available. If the user has an Atlassian account, their password is not changed. If the user does not have an Atlassian account, they are sent an email asking them set up an account."),
})

export const CreateUserOutput = z.object({
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

export const createUser = pikkuSessionlessFunc({
  description: "Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is available this resource will be deprecated.\n\nIf the user exists and has access to Jira, the operation returns a 201 status. If the user exists but does not have access to Jira, the operation returns a 400 status.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateUserInput,
  output: CreateUserOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/user", data) as any
  },
})
