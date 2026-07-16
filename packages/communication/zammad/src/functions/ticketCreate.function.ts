import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketCreateInput = z.object({
  title: z.string().optional(),
  group: z.string().optional(),
  customer: z.string().optional(),
})

export const TicketCreateOutput = z.record(z.string(), z.unknown())

export const ticketCreate = pikkuSessionlessFunc({
  description: "Create a ticket",
  input: TicketCreateInput,
  output: TicketCreateOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("POST", "/tickets", data) as any
  },
})
