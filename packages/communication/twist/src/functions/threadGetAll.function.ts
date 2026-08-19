import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ThreadGetAllInput = z.object({
  channel_id: z.string(),
})

export const ThreadGetAllOutput = z.record(z.string(), z.unknown())

export const threadGetAll = pikkuSessionlessFunc({
  description: "Get all threads",
  input: ThreadGetAllInput,
  output: ThreadGetAllOutput,
  func: async ({ twist }, data) => {
    return twist.call("GET", "/threads/get", data) as any
  },
})
