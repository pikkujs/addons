import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MessageDeleteInput = z.object({
  id: z.string(),
})

export const MessageDeleteOutput = z.record(z.string(), z.unknown())

export const messageDelete = pikkuSessionlessFunc({
  description: "Remove a message from a conversation",
  input: MessageDeleteInput,
  output: MessageDeleteOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/conversation_messages/remove", data) as any
  },
})
