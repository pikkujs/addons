import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ThreadCreateInput = z.object({
  channel_id: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
})

export const ThreadCreateOutput = z.record(z.string(), z.unknown())

export const threadCreate = pikkuSessionlessFunc({
  description: "Add a thread",
  input: ThreadCreateInput,
  output: ThreadCreateOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/threads/add", data) as any
  },
})
