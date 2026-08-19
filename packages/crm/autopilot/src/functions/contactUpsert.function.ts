import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactUpsertInput = z.object({
  Email: z.string().optional(),
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
})

export const ContactUpsertOutput = z.record(z.string(), z.unknown())

export const contactUpsert = pikkuSessionlessFunc({
  description: "Create or update a contact",
  input: ContactUpsertInput,
  output: ContactUpsertOutput,
  func: async ({ autopilot }, data) => {
    return autopilot.call("POST", "/contact", data) as any
  },
})
