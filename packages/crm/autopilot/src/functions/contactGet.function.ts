import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetInput = z.object({
  contactId: z.string(),
})

export const ContactGetOutput = z.record(z.string(), z.unknown())

export const contactGet = pikkuSessionlessFunc({
  description: "Get a contact",
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ autopilot }, data) => {
    return autopilot.call("GET", "/contact/{contactId}", data) as any
  },
})
