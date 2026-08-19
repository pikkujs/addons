import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteMessageInput = z.object({
  body: z.string().optional(),
})

export const DeleteMessageOutput = z.record(z.string(), z.unknown())

export const deleteMessage = pikkuSessionlessFunc({
  description: "Delete message",
  input: DeleteMessageInput,
  output: DeleteMessageOutput,
  func: async ({ rabbitmq }, data) => {
    return rabbitmq.call("POST", "/delete", data) as any
  },
})
