import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ThreadGetInput = z.object({
  id: z.string(),
})

export const ThreadGetOutput = z.record(z.string(), z.unknown())

export const threadGet = pikkuSessionlessFunc({
  description: "Get a thread",
  input: ThreadGetInput,
  output: ThreadGetOutput,
  func: async ({ twist }, data) => {
    return twist.call("GET", "/threads/getone", data) as any
  },
})
