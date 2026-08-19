import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TicketUpdateInput = z.object({
  id: z.string(),
  subject: z.string().optional(),
  description: z.string().optional(),
})

export const TicketUpdateOutput = z.record(z.string(), z.unknown())

export const ticketUpdate = pikkuSessionlessFunc({
  description: "TicketUpdate",
  input: TicketUpdateInput,
  output: TicketUpdateOutput,
  func: async ({ freshdesk }, data) => {
    return freshdesk.call("PUT", "/tickets/{id}", data) as any
  },
})
