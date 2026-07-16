import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContactGetAllOutput = z.record(z.string(), z.unknown())

export const contactGetAll = pikkuSessionlessFunc({
  description: "ContactGetAll",
  output: ContactGetAllOutput,
  func: async ({ freshdesk }) => {
    return freshdesk.call("GET", "/contacts") as any
  },
})
