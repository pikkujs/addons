import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetAllOutput = z.record(z.string(), z.unknown())

export const contactGetAll = pikkuSessionlessFunc({
  description: "Contact get all",
  output: ContactGetAllOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/contacts") as any
  },
})
