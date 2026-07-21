import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetInput = z.object({
  id: z.string(),
})

export const ContactGetOutput = z.record(z.string(), z.unknown())

export const contactGet = pikkuSessionlessFunc({
  description: "ContactGet",
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ freshdesk }, data) => {
    return freshdesk.call("GET", "/contacts/{id}", data) as any
  },
})
