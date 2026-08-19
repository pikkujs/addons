import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MessageCreateInput = z.object({
  message: z.string().optional(),
  title: z.string().optional(),
  priority: z.number().optional(),
})

export const MessageCreateOutput = z.record(z.string(), z.unknown())

export const messageCreate = pikkuSessionlessFunc({
  description: "Create a message",
  input: MessageCreateInput,
  output: MessageCreateOutput,
  func: async ({ gotify }, data) => {
    return gotify.call("POST", "/message", data) as any
  },
})
