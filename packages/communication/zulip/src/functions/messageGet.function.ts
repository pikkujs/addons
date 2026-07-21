import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageGetInput = z.object({
  messageId: z.string(),
})

export const MessageGetOutput = z.record(z.string(), z.unknown())

export const messageGet = pikkuSessionlessFunc({
  description: "Get a message",
  input: MessageGetInput,
  output: MessageGetOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("GET", "/messages/{messageId}", data) as any
  },
})
