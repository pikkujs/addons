// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ActivityMarkNotificationsAsReadInput = z.object({
  last_read_at: z.string().datetime().optional().describe("Describes the last point that notifications were checked. Anything updated since this time will not be marked as read. If you omit this parameter, all notifications are marked as read. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. Default: The current timestamp."),
  read: z.boolean().optional().describe("Whether the notification has been read."),
})

export const ActivityMarkNotificationsAsReadOutput = z.object({
  message: z.string().optional(),
})

export const activityMarkNotificationsAsRead = pikkuSessionlessFunc({
  description: "Marks all notifications as \"read\" for the current user. If the number of notifications is too large to complete in one request, you will receive a `202 Accepted` status and GitHub will run an asynchronous process to mark notifications as \"read.\" To check whether any \"unread\" notifications remain, you can use the [List notifications for the authenticated user](https://docs.github.com/rest/reference/activity#list-notifications-for-the-authenticated-user) endpoint and pass the query parameter `all=false`.",
  input: ActivityMarkNotificationsAsReadInput,
  output: ActivityMarkNotificationsAsReadOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/notifications", data) as any
  },
})
