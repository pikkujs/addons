import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const NotificationDeleteInput = z.object({
  notificationId: z.string(),
})

export const notificationDelete = pikkuSessionlessFunc({
  description: "Delete notification",
  input: NotificationDeleteInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/notifications/{notificationId}", data)
  },
})
