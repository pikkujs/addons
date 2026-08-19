// activity — Activity APIs provide access to notifications, subscriptions, and timelines.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError } from '@pikku/core/errors'

export const ActivityMarkThreadAsReadInput = z.object({
  thread_id: z.number().int().describe("The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/reference/activity#list-notifications-for-the-authenticated-user))."),
})

export const activityMarkThreadAsRead = pikkuSessionlessFunc({
  description: "Marks a thread as \"read.\" Marking a thread as \"read\" is equivalent to clicking a notification in your notification inbox on GitHub: https://github.com/notifications.",
  input: ActivityMarkThreadAsReadInput,
  errors: [ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/notifications/threads/{thread_id}", data)
  },
})
