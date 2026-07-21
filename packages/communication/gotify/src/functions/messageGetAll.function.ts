import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageGetAllInput = z.object({
  limit: z.number().optional(),
})

export const MessageGetAllOutput = z.record(z.string(), z.unknown())

export const messageGetAll = pikkuSessionlessFunc({
  description: "Get many messages",
  input: MessageGetAllInput,
  output: MessageGetAllOutput,
  func: async ({ gotify }, data) => {
    return gotify.call("GET", "/message", data) as any
  },
})
