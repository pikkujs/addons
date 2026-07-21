import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SendMessageInput = z.object({
  body: z.string().optional(),
})

export const SendMessageOutput = z.record(z.string(), z.unknown())

export const sendMessage = pikkuSessionlessFunc({
  description: "Send message",
  input: SendMessageInput,
  output: SendMessageOutput,
  func: async ({ awsSqs }, data) => {
    return awsSqs.call("POST", "/send", data) as any
  },
})
