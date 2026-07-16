import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageSendStreamInput = z.object({
  stream: z.string().optional(),
  topic: z.string().optional(),
  content: z.string().optional(),
})

export const MessageSendStreamOutput = z.record(z.string(), z.unknown())

export const messageSendStream = pikkuSessionlessFunc({
  description: "Send a stream message",
  input: MessageSendStreamInput,
  output: MessageSendStreamOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("POST", "/messages/stream", data) as any
  },
})
