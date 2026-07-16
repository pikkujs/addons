import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageUpdateInput = z.object({
  messageId: z.string(),
  content: z.string().optional(),
  topic: z.string().optional(),
  propagate_mode: z.string().optional(),
})

export const MessageUpdateOutput = z.record(z.string(), z.unknown())

export const messageUpdate = pikkuSessionlessFunc({
  description: "Update a message",
  input: MessageUpdateInput,
  output: MessageUpdateOutput,
  func: async ({ zulip }, data) => {
    return zulip.call("PATCH", "/messages/{messageId}", data) as any
  },
})
