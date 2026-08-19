import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AlertGetInput = z.object({
  id: z.string(),
})

export const AlertGetOutput = z.record(z.string(), z.unknown())

export const alertGet = pikkuSessionlessFunc({
  description: "Get an alert",
  input: AlertGetInput,
  output: AlertGetOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/alert/{id}", data) as any
  },
})
