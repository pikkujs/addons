// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ActivitySetThreadSubscriptionInput = z.object({
  thread_id: z.number().int().describe("The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/reference/activity#list-notifications-for-the-authenticated-user))."),
  ignored: z.boolean().optional().default(false).describe("Whether to block all notifications from a thread."),
})

export const ActivitySetThreadSubscriptionOutput = z.object({
  created_at: z.string().datetime().nullable(),
  ignored: z.boolean(),
  reason: z.string().nullable(),
  repository_url: z.string().url().optional(),
  subscribed: z.boolean(),
  thread_url: z.string().url().optional(),
  url: z.string().url(),
}).describe("Thread Subscription")

export const activitySetThreadSubscription = pikkuSessionlessFunc({
  description: "If you are watching a repository, you receive notifications for all threads by default. Use this endpoint to ignore future notifications for threads until you comment on the thread or get an **@mention**.\n\nYou can also use this endpoint to subscribe to threads that you are currently not receiving notifications for or to subscribed to threads that you have previously ignored.\n\nUnsubscribing from a conversation in a repository that you are not watching is functionally equivalent to the [Delete a thread subscription](https://docs.github.com/rest/reference/activity#delete-a-thread-subscription) endpoint.",
  input: ActivitySetThreadSubscriptionInput,
  output: ActivitySetThreadSubscriptionOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/notifications/threads/{thread_id}/subscription", data) as any
  },
})
