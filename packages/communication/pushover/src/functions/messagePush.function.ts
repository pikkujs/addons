import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MessagePushInput = z.object({
  user: z.string().optional(),
  message: z.string().optional(),
  priority: z.number().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
  device: z.string().optional(),
  sound: z.string().optional(),
})

export const MessagePushOutput = z.record(z.string(), z.unknown())

export const messagePush = pikkuSessionlessFunc({
  description: "Push a notification message",
  input: MessagePushInput,
  output: MessagePushOutput,
  func: async ({ pushover }, data) => {
    return pushover.call("POST", "/messages.json", data) as any
  },
})
