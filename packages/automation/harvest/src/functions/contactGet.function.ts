import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContactGetInput = z.object({
  id: z.string(),
})

export const ContactGetOutput = z.record(z.string(), z.unknown())

export const contactGet = pikkuSessionlessFunc({
  description: "Contact get",
  input: ContactGetInput,
  output: ContactGetOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("GET", "/contacts/{id}", data) as any
  },
})
