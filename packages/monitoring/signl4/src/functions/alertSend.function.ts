import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AlertSendInput = z.object({
  message: z.string().optional(),
  title: z.string().optional(),
  service: z.string().optional(),
  externalId: z.string().optional(),
})

export const AlertSendOutput = z.object({
  eventId: z.string().optional(),
})

export const alertSend = pikkuSessionlessFunc({
  description: "Send an alert",
  input: AlertSendInput,
  output: AlertSendOutput,
  func: async ({ signl4 }, data) => {
    return signl4.call("POST", "/alert/send", data) as any
  },
})
