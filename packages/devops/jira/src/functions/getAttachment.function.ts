// Issue attachments — This resource represents issue attachments and the attachment settings for Jira. Use it to get the metadata for an attachment, delete an attachment, and view the metadata for the contents of an attachment. Also, use it to get the attachment settings for Jira.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetAttachmentInput = z.object({
  id: z.string().describe("The ID of the attachment."),
})

export const GetAttachmentOutput = z.object({
  author: z.object({
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
  }).optional().describe("Details of the user who attached the file."),
  content: z.string().optional().describe("The URL of the attachment."),
  created: z.string().datetime().optional().describe("The datetime the attachment was created."),
  filename: z.string().optional().describe("The name of the attachment file."),
  id: z.number().int().optional().describe("The ID of the attachment."),
  mimeType: z.string().optional().describe("The MIME type of the attachment."),
  properties: z.record(z.string(), z.unknown()).optional().describe("Additional properties of the attachment."),
  self: z.string().url().optional().describe("The URL of the attachment metadata details."),
  size: z.number().int().optional().describe("The size of the attachment."),
  thumbnail: z.string().optional().describe("The URL of a thumbnail representing the attachment."),
}).describe("Metadata for an issue attachment.")

export const getAttachment = pikkuSessionlessFunc({
  description: "Returns the metadata for an attachment. Note that the attachment itself is not returned.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: GetAttachmentInput,
  output: GetAttachmentOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/attachment/{id}", data) as any
  },
})
