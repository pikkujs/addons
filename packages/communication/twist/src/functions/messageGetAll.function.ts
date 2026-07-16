import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageGetAllInput = z.object({
  conversation_id: z.string(),
})

export const MessageGetAllOutput = z.record(z.string(), z.unknown())

export const messageGetAll = pikkuSessionlessFunc({
  description: "Get all conversation messages",
  input: MessageGetAllInput,
  output: MessageGetAllOutput,
  func: async ({ twist }, data) => {
    return twist.call("GET", "/conversation_messages/get", data) as any
  },
})
