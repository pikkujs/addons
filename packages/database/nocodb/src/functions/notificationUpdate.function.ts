import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const NotificationUpdateInput = z.object({
  notificationId: z.string(),
  is_read: z.boolean().optional(),
})

export const notificationUpdate = pikkuSessionlessFunc({
  description: "Notificattion update",
  input: NotificationUpdateInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/notifications/{notificationId}", data)
  },
})
