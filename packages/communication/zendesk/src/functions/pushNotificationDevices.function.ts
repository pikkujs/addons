import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PushNotificationDevicesInput = z.object({
  push_notification_devices: z.array(z.string()).optional(),
})

export const PushNotificationDevicesOutput = z.string().describe("empty")

export const pushNotificationDevices = pikkuSessionlessFunc({
  description: "Unregisters the mobile devices that are receiving push notifications. Specify the devices as an array of mobile device tokens.\n\n#### Allowed for\n\n* Admins",
  input: PushNotificationDevicesInput,
  output: PushNotificationDevicesOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/push_notification_devices/destroy_many", data) as any
  },
})
