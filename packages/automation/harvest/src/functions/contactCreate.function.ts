import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactCreateInput = z.object({
  client_id: z.string().optional(),
  first_name: z.string().optional(),
})

export const ContactCreateOutput = z.record(z.string(), z.unknown())

export const contactCreate = pikkuSessionlessFunc({
  description: "Contact create",
  input: ContactCreateInput,
  output: ContactCreateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/contacts", data) as any
  },
})
