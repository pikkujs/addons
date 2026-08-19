import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExecuteQueryInput = z.object({
  body: z.string().optional(),
})

export const ExecuteQueryOutput = z.record(z.string(), z.unknown())

export const executeQuery = pikkuSessionlessFunc({
  description: "Execute query",
  input: ExecuteQueryInput,
  output: ExecuteQueryOutput,
  func: async ({ questDb }, data) => {
    return questDb.call("POST", "/exec", data) as any
  },
})
