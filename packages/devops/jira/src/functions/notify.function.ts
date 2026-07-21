// Issues — This resource represents Jira issues. Use it to: * create or edit issues, individually or in bulk. * retrieve metadata about the options for creating or editing issues. * delete an issue. * assign a user to an issue. * get issue changelogs. * send notifications about an issue. * get details of the transitions available for an issue. * transition an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const NotifyInput = z.object({
  issueIdOrKey: z.string().describe("ID or key of the issue that the notification is sent for."),
  htmlBody: z.string().optional().describe("The HTML body of the email notification for the issue."),
  restrict: z.object({
  groupIds: z.array(z.string()).optional().describe("List of groupId memberships required to receive the notification."),
  groups: z.array(z.object({
    groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
    name: z.string().optional().describe("The name of group."),
    self: z.string().url().optional().describe("The URL for these group details."),
  })).optional().describe("List of group memberships required to receive the notification."),
  permissions: z.array(z.object({
    id: z.string().optional().describe("The ID of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions."),
    key: z.string().optional().describe("The key of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions."),
  })).optional().describe("List of permissions required to receive the notification."),
}).optional().describe("Restricts the notifications to users with the specified permissions."),
  subject: z.string().optional().describe("The subject of the email notification for the issue. If this is not specified, then the subject is set to the issue key and summary."),
  textBody: z.string().optional().describe("The plain text body of the email notification for the issue."),
  to: z.object({
  assignee: z.boolean().optional().describe("Whether the notification should be sent to the issue's assignees."),
  groupIds: z.array(z.string()).optional().describe("List of groupIds to receive the notification."),
  groups: z.array(z.object({
    groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
    name: z.string().optional().describe("The name of group."),
    self: z.string().url().optional().describe("The URL for these group details."),
  })).optional().describe("List of groups to receive the notification."),
  reporter: z.boolean().optional().describe("Whether the notification should be sent to the issue's reporter."),
  users: z.array(z.object({
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
  })).optional().describe("List of users to receive the notification."),
  voters: z.boolean().optional().describe("Whether the notification should be sent to the issue's voters."),
  watchers: z.boolean().optional().describe("Whether the notification should be sent to the issue's watchers."),
}).optional().describe("The recipients of the email notification for the issue."),
})

export const NotifyOutput = z.unknown()

export const notify = pikkuSessionlessFunc({
  description: "Creates an email notification for an issue and adds it to the mail queue.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: NotifyInput,
  output: NotifyOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issue/{issueIdOrKey}/notify", data) as any
  },
})
