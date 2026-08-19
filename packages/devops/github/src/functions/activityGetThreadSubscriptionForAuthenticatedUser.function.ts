// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const ActivityGetThreadSubscriptionForAuthenticatedUserInput = z.object({
  thread_id: z.number().int().describe("The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/reference/activity#list-notifications-for-the-authenticated-user))."),
})

export const ActivityGetThreadSubscriptionForAuthenticatedUserOutput = z.object({
  created_at: z.string().datetime().nullable(),
  ignored: z.boolean(),
  reason: z.string().nullable(),
  repository_url: z.string().url().optional(),
  subscribed: z.boolean(),
  thread_url: z.string().url().optional(),
  url: z.string().url(),
}).describe("Thread Subscription")

export const activityGetThreadSubscriptionForAuthenticatedUser = pikkuSessionlessFunc({
  description: "This checks to see if the current user is subscribed to a thread. You can also [get a repository subscription](https://docs.github.com/rest/reference/activity#get-a-repository-subscription).\n\nNote that subscriptions are only generated if a user is participating in a conversation--for example, they've replied to the thread, were **@mentioned**, or manually subscribe to a thread.",
  input: ActivityGetThreadSubscriptionForAuthenticatedUserInput,
  output: ActivityGetThreadSubscriptionForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/notifications/threads/{thread_id}/subscription", data) as any
  },
})
