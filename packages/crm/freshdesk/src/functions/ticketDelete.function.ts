import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketDeleteInput = z.object({
  id: z.string(),
})

export const TicketDeleteOutput = z.record(z.string(), z.unknown())

export const ticketDelete = pikkuSessionlessFunc({
  description: "TicketDelete",
  input: TicketDeleteInput,
  output: TicketDeleteOutput,
  func: async ({ freshdesk }, data) => {
    return freshdesk.call("DELETE", "/tickets/{id}", data) as any
  },
})
