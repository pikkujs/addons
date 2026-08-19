import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TicketGetInput = z.object({
  id: z.string(),
})

export const TicketGetOutput = z.record(z.string(), z.unknown())

export const ticketGet = pikkuSessionlessFunc({
  description: "Get a ticket",
  input: TicketGetInput,
  output: TicketGetOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("GET", "/tickets/{id}", data) as any
  },
})
