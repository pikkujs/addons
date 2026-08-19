// Issues — This resource represents Jira issues. Use it to: * create or edit issues, individually or in bulk. * retrieve metadata about the options for creating or editing issues. * delete an issue. * assign a user to an issue. * get issue changelogs. * send notifications about an issue. * get details of the transitions available for an issue. * transition an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'

export const GetChangeLogsByIdsInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  changelogIds: z.array(z.number().int()).describe("The list of changelog IDs."),
})

export const GetChangeLogsByIdsOutput = z.object({
  histories: z.array(z.object({
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
    }).optional().describe("The user who made the change."),
    created: z.string().datetime().optional().describe("The date on which the change took place."),
    historyMetadata: z.object({
      activityDescription: z.string().optional().describe("The activity described in the history record."),
      activityDescriptionKey: z.string().optional().describe("The key of the activity described in the history record."),
      actor: z.object({
        avatarUrl: z.string().optional().describe("The URL to an avatar for the user or system associated with a history record."),
        displayName: z.string().optional().describe("The display name of the user or system associated with a history record."),
        displayNameKey: z.string().optional().describe("The key of the display name of the user or system associated with a history record."),
        id: z.string().optional().describe("The ID of the user or system associated with a history record."),
        type: z.string().optional().describe("The type of the user or system associated with a history record."),
        url: z.string().optional().describe("The URL of the user or system associated with a history record."),
      }).optional().describe("Details of the user whose action created the history record."),
      cause: z.object({
        avatarUrl: z.string().optional().describe("The URL to an avatar for the user or system associated with a history record."),
        displayName: z.string().optional().describe("The display name of the user or system associated with a history record."),
        displayNameKey: z.string().optional().describe("The key of the display name of the user or system associated with a history record."),
        id: z.string().optional().describe("The ID of the user or system associated with a history record."),
        type: z.string().optional().describe("The type of the user or system associated with a history record."),
        url: z.string().optional().describe("The URL of the user or system associated with a history record."),
      }).optional().describe("Details of the cause that triggered the creation the history record."),
      description: z.string().optional().describe("The description of the history record."),
      descriptionKey: z.string().optional().describe("The description key of the history record."),
      emailDescription: z.string().optional().describe("The description of the email address associated the history record."),
      emailDescriptionKey: z.string().optional().describe("The description key of the email address associated the history record."),
      extraData: z.record(z.string(), z.string()).optional().describe("Additional arbitrary information about the history record."),
      generator: z.object({
        avatarUrl: z.string().optional().describe("The URL to an avatar for the user or system associated with a history record."),
        displayName: z.string().optional().describe("The display name of the user or system associated with a history record."),
        displayNameKey: z.string().optional().describe("The key of the display name of the user or system associated with a history record."),
        id: z.string().optional().describe("The ID of the user or system associated with a history record."),
        type: z.string().optional().describe("The type of the user or system associated with a history record."),
        url: z.string().optional().describe("The URL of the user or system associated with a history record."),
      }).optional().describe("Details of the system that generated the history record."),
      type: z.string().optional().describe("The type of the history record."),
    }).optional().describe("The history metadata associated with the changed."),
    id: z.string().optional().describe("The ID of the changelog."),
    items: z.array(z.object({
      field: z.string().optional().describe("The name of the field changed."),
      fieldId: z.string().optional().describe("The ID of the field changed."),
      fieldtype: z.string().optional().describe("The type of the field changed."),
      from: z.string().optional().describe("The details of the original value."),
      fromString: z.string().optional().describe("The details of the original value as a string."),
      to: z.string().optional().describe("The details of the new value."),
    })).optional().describe("The list of items changed."),
  })).optional().describe("The list of changelogs."),
  maxResults: z.number().int().optional().describe("The maximum number of results that could be on the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned on the page."),
  total: z.number().int().optional().describe("The number of results on the page."),
}).describe("A page of changelogs.")

export const getChangeLogsByIds = pikkuSessionlessFunc({
  description: "Returns changelogs for an issue specified by a list of changelog IDs.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: GetChangeLogsByIdsInput,
  output: GetChangeLogsByIdsOutput,
  errors: [BadRequestError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issue/{issueIdOrKey}/changelog/list", data) as any
  },
})
