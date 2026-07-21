import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageGetAllInput = z.object({
  roomId: z.string(),
  dir: z.string().optional(),
  limit: z.number().int().optional(),
  from: z.string().optional(),
  filter: z.string().optional(),
})

export const MessageGetAllOutput = z.object({
  chunk: z.array(z.record(z.string(), z.unknown())).optional(),
})

export const messageGetAll = pikkuSessionlessFunc({
  description: "Get messages from a room",
  input: MessageGetAllInput,
  output: MessageGetAllOutput,
  func: async ({ matrix }, data) => {
    return matrix.call("GET", "/rooms/{roomId}/messages", data) as any
  },
})
