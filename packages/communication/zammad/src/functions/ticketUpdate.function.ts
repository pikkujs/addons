import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketUpdateInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  state: z.string().optional(),
})

export const TicketUpdateOutput = z.record(z.string(), z.unknown())

export const ticketUpdate = pikkuSessionlessFunc({
  description: "Update a ticket",
  input: TicketUpdateInput,
  output: TicketUpdateOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("PUT", "/tickets/{id}", data) as any
  },
})
