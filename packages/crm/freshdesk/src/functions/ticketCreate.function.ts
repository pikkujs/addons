import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TicketCreateInput = z.object({
  subject: z.string().optional(),
  description: z.string().optional(),
  email: z.string().optional(),
})

export const TicketCreateOutput = z.record(z.string(), z.unknown())

export const ticketCreate = pikkuSessionlessFunc({
  description: "TicketCreate",
  input: TicketCreateInput,
  output: TicketCreateOutput,
  func: async ({ freshdesk }, data) => {
    return freshdesk.call("POST", "/tickets", data) as any
  },
})
