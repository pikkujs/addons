import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const notificationMarkAllAsRead = pikkuSessionlessFunc({
  description: "Mark all notifications as read",
  func: async ({ nocodb }) => {
    return nocodb.call("POST", "/api/v1/notifications/mark-all-read")
  },
})
