import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageGetInput = z.object({
  id: z.string(),
})

export const MessageGetOutput = z.record(z.string(), z.unknown())

export const messageGet = pikkuSessionlessFunc({
  description: "Get a conversation message",
  input: MessageGetInput,
  output: MessageGetOutput,
  func: async ({ twist }, data) => {
    return twist.call("GET", "/conversation_messages/getone", data) as any
  },
})
