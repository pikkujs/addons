// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityMarkRepoNotificationsAsReadInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  last_read_at: z.string().datetime().optional().describe("Describes the last point that notifications were checked. Anything updated since this time will not be marked as read. If you omit this parameter, all notifications are marked as read. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. Default: The current timestamp."),
})

export const ActivityMarkRepoNotificationsAsReadOutput = z.object({
  message: z.string().optional(),
  url: z.string().optional(),
})

export const activityMarkRepoNotificationsAsRead = pikkuSessionlessFunc({
  description: "Marks all notifications in a repository as \"read\" for the current user. If the number of notifications is too large to complete in one request, you will receive a `202 Accepted` status and GitHub will run an asynchronous process to mark notifications as \"read.\" To check whether any \"unread\" notifications remain, you can use the [List repository notifications for the authenticated user](https://docs.github.com/rest/reference/activity#list-repository-notifications-for-the-authenticated-user) endpoint and pass the query parameter `all=false`.",
  input: ActivityMarkRepoNotificationsAsReadInput,
  output: ActivityMarkRepoNotificationsAsReadOutput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/notifications", data) as any
  },
})
