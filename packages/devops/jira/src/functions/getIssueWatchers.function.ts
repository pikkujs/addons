// Issue watchers — This resource represents users watching an issue. Use it to get details of users watching an issue as well as start and stop a user watching an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetIssueWatchersInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
})

export const GetIssueWatchersOutput = z.object({
  isWatching: z.boolean().optional().describe("Whether the calling user is watching this issue."),
  self: z.string().optional().describe("The URL of these issue watcher details."),
  watchCount: z.number().int().optional().describe("The number of users watching this issue."),
  watchers: z.array(z.object({
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
  })).optional().describe("Details of the users watching this issue."),
}).describe("The details of watchers on an issue.")

export const getIssueWatchers = pikkuSessionlessFunc({
  description: "Returns the watchers for an issue.\n\nThis operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General configuration for Jira. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is ini\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n *  To see details of users on the watchlist other than themselves, *View voters and watchers* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.",
  input: GetIssueWatchersInput,
  output: GetIssueWatchersOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issue/{issueIdOrKey}/watchers", data) as any
  },
})
