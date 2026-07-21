import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketGetInput = z.object({
  id: z.string(),
})

export const TicketGetOutput = z.record(z.string(), z.unknown())

export const ticketGet = pikkuSessionlessFunc({
  description: "TicketGet",
  input: TicketGetInput,
  output: TicketGetOutput,
  func: async ({ freshdesk }, data) => {
    return freshdesk.call("GET", "/tickets/{id}", data) as any
  },
})
