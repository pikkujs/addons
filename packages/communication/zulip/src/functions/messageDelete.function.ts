import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MessageDeleteInput = z.object({
  messageId: z.string(),
})

export const MessageDeleteOutput = z.record(z.string(), z.unknown())

export const messageDelete = pikkuSessionlessFunc({
  description: "Delete a message",
  input: MessageDeleteInput,
  output: MessageDeleteOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("DELETE", "/messages/{messageId}", data) as any
  },
})
