import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactDeleteInput = z.object({
  id: z.string(),
})

export const ContactDeleteOutput = z.record(z.string(), z.unknown())

export const contactDelete = pikkuSessionlessFunc({
  description: "ContactDelete",
  input: ContactDeleteInput,
  output: ContactDeleteOutput,
  func: async ({ freshdesk }, data) => {
    return freshdesk.call("DELETE", "/contacts/{id}", data) as any
  },
})
