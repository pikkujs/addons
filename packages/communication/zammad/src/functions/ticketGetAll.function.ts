import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TicketGetAllInput = z.object({
  limit: z.number().int().optional(),
})

export const TicketGetAllOutput = z.record(z.string(), z.unknown())

export const ticketGetAll = pikkuSessionlessFunc({
  description: "Get all tickets",
  input: TicketGetAllInput,
  output: TicketGetAllOutput,
  func: async ({ zammad }, data) => {
    return zammad.call("GET", "/tickets", data) as any
  },
})
