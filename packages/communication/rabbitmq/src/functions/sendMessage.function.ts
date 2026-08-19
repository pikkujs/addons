import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SendMessageInput = z.object({
  body: z.string().optional(),
})

export const SendMessageOutput = z.record(z.string(), z.unknown())

export const sendMessage = pikkuSessionlessFunc({
  description: "Send message",
  input: SendMessageInput,
  output: SendMessageOutput,
  func: async ({ rabbitmq }, data) => {
    return rabbitmq.call("POST", "/send", data) as any
  },
})
