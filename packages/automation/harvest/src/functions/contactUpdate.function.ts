import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactUpdateInput = z.object({
  id: z.string(),
  first_name: z.string().optional(),
})

export const ContactUpdateOutput = z.record(z.string(), z.unknown())

export const contactUpdate = pikkuSessionlessFunc({
  description: "Contact update",
  input: ContactUpdateInput,
  output: ContactUpdateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/contacts/{id}", data) as any
  },
})
