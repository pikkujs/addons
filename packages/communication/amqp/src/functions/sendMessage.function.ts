import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SendMessageInput = z.object({
  sink: z.string().optional(),
  message: z.string().optional(),
})

export const SendMessageOutput = z.object({
  id: z.string().optional(),
})

export const sendMessage = pikkuSessionlessFunc({
  description: "Send a raw message via AMQP",
  input: SendMessageInput,
  output: SendMessageOutput,
  func: async ({ amqp }, data) => {
    return amqp.call("POST", "/send", data) as any
  },
})
