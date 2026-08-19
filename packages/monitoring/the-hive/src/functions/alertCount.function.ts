import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AlertCountInput = z.object({
  query: z.record(z.string(), z.unknown()).optional(),
})

export const AlertCountOutput = z.record(z.string(), z.unknown())

export const alertCount = pikkuSessionlessFunc({
  description: "Count alerts",
  input: AlertCountInput,
  output: AlertCountOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/alert/count", data) as any
  },
})
