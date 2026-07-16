import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendPrivateInput = z.object({
  to: z.string().optional(),
  content: z.string().optional(),
})

export const MessageSendPrivateOutput = z.record(z.string(), z.unknown())

export const messageSendPrivate = pikkuSessionlessFunc({
  description: "Send a private message",
  input: MessageSendPrivateInput,
  output: MessageSendPrivateOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("POST", "/messages", data) as any
  },
})
