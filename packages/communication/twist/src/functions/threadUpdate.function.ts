import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ThreadUpdateInput = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
})

export const ThreadUpdateOutput = z.record(z.string(), z.unknown())

export const threadUpdate = pikkuSessionlessFunc({
  description: "Update a thread",
  input: ThreadUpdateInput,
  output: ThreadUpdateOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/threads/update", data) as any
  },
})
