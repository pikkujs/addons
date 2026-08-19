import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TicketDeleteInput = z.object({
  id: z.string(),
})

export const TicketDeleteOutput = z.record(z.string(), z.unknown())

export const ticketDelete = pikkuSessionlessFunc({
  description: "Delete a ticket",
  input: TicketDeleteInput,
  output: TicketDeleteOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("DELETE", "/tickets/{id}", data) as any
  },
})
