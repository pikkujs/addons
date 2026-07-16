import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const NotificationPollOutput = z.record(z.string(), z.unknown())

export const notificationPoll = pikkuSessionlessFunc({
  description: "Poll notifications",
  output: NotificationPollOutput,
  func: async ({ nocodb }) => {
    return nocodb.call("GET", "/api/v1/notifications/poll") as any
  },
})
