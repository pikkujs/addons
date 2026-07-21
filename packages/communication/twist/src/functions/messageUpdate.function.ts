import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageUpdateInput = z.object({
  id: z.string().optional(),
  content: z.string().optional(),
})

export const MessageUpdateOutput = z.record(z.string(), z.unknown())

export const messageUpdate = pikkuSessionlessFunc({
  description: "Update a message in a conversation",
  input: MessageUpdateInput,
  output: MessageUpdateOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/conversation_messages/update", data) as any
  },
})
