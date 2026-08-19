import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AlertGetAllInput = z.object({
  range: z.string().optional(),
  sort: z.string().optional(),
})

export const AlertGetAllOutput = z.record(z.string(), z.unknown())

export const alertGetAll = pikkuSessionlessFunc({
  description: "Get many alerts",
  input: AlertGetAllInput,
  output: AlertGetAllOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/alert", data) as any
  },
})
