import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ThreadDeleteInput = z.object({
  id: z.string(),
})

export const ThreadDeleteOutput = z.record(z.string(), z.unknown())

export const threadDelete = pikkuSessionlessFunc({
  description: "Remove a thread",
  input: ThreadDeleteInput,
  output: ThreadDeleteOutput,
  func: async ({ twist }, data) => {
    return twist.call("POST", "/threads/remove", data) as any
  },
})
