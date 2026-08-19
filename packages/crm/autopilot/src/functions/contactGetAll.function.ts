import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetAllInput = z.object({
  limit: z.number().optional(),
})

export const ContactGetAllOutput = z.record(z.string(), z.unknown())

export const contactGetAll = pikkuSessionlessFunc({
  description: "Get all contacts",
  input: ContactGetAllInput,
  output: ContactGetAllOutput,
  func: async ({ autopilot }, data) => {
    return autopilot.call("GET", "/contacts", data) as any
  },
})
