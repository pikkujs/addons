import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactDeleteInput = z.object({
  id: z.string(),
})

export const ContactDeleteOutput = z.record(z.string(), z.unknown())

export const contactDelete = pikkuSessionlessFunc({
  description: "Contact delete",
  input: ContactDeleteInput,
  output: ContactDeleteOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/contacts/{id}", data) as any
  },
})
