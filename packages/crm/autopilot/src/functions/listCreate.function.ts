import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListCreateInput = z.object({
  name: z.string().optional(),
})

export const ListCreateOutput = z.record(z.string(), z.unknown())

export const listCreate = pikkuSessionlessFunc({
  description: "Create a list",
  input: ListCreateInput,
  output: ListCreateOutput,
  func: async ({ autopilot }, data) => {
    return autopilot.call("POST", "/list", data) as any
  },
})
