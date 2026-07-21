import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetInput = z.object({
  contactId: z.string(),
})

export const ContactGetOutput = z.record(z.string(), z.unknown())

export const contactGet = pikkuSessionlessFunc({
  description: "Get a contact",
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ automizy }, data) => {
    return automizy.call("GET", "/contacts/{contactId}", data) as any
  },
})
