// Issue worklogs — This resource represents issue worklogs. Use it to: * get, create, update, and delete worklogs. * obtain lists of updated or deleted worklogs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetWorklogsForIdsInput = z.object({
  expand: z.string().optional().default("").describe("Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog."),
  ids: z.array(z.number().int()).describe("A list of worklog IDs."),
})

export const GetWorklogsForIdsOutput = z.array(z.object({
  author: z.object({
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
  }).optional().describe("Details of the user who created the worklog."),
  comment: z.unknown().optional().describe("A comment about the worklog in [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/). Optional when creating or updating a worklog."),
  created: z.string().datetime().optional().describe("The datetime on which the worklog was created."),
  id: z.string().optional().describe("The ID of the worklog record."),
  issueId: z.string().optional().describe("The ID of the issue this worklog is for."),
  properties: z.array(z.object({
    key: z.string().optional().describe("The key of the property. Required on create and update."),
    value: z.unknown().optional().describe("The value of the property. Required on create and update."),
  })).optional().describe("Details of properties for the worklog. Optional when creating or updating a worklog."),
  self: z.string().url().optional().describe("The URL of the worklog item."),
  started: z.string().datetime().optional().describe("The datetime on which the worklog effort was started. Required when creating a worklog. Optional when updating a worklog."),
  timeSpent: z.string().optional().describe("The time spent working on the issue as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). Required when creating a worklog if `timeSpentSeconds` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpentSecond` is provided."),
  timeSpentSeconds: z.number().int().optional().describe("The time in seconds spent working on the issue. Required when creating a worklog if `timeSpent` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpent` is provided."),
  updateAuthor: z.object({
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
  }).optional().describe("Details of the user who last updated the worklog."),
  updated: z.string().datetime().optional().describe("The datetime on which the worklog was last updated."),
  visibility: z.object({
    identifier: z.string().nullable().optional().describe("The ID of the group or the name of the role that visibility of this item is restricted to."),
    type: z.enum(["group", "role"]).optional().describe("Whether visibility of this item is restricted to a group or role."),
    value: z.string().optional().describe("The name of the group or role that visibility of this item is restricted to. Please note that the name of a group is mutable, to reliably identify a group use `identifier`."),
  }).optional().describe("Details about any restrictions in the visibility of the worklog. Optional when creating or updating a worklog."),
}))

export const getWorklogsForIds = pikkuSessionlessFunc({
  description: "Returns worklog details for a list of worklog IDs.\n\nThe returned list of worklogs is limited to 1000 items.\n\n**[Permissions](#permissions) required:** Permission to access Jira, however, worklogs are only returned where either of the following is true:\n\n *  the worklog is set as *Viewable by All Users*.\n *  the user is a member of a project role or group with permission to view the worklog.",
  input: GetWorklogsForIdsInput,
  output: GetWorklogsForIdsOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/worklog/list", data) as any
  },
})
