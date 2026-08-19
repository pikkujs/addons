import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetInput = z.object({
  id: z.string(),
})

export const ContactGetOutput = z.record(z.string(), z.unknown())

export const contactGet = pikkuSessionlessFunc({
  description: "Get Contact",
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/sobjects/Contact/{id}", data) as any
  },
})
