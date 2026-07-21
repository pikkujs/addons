import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TicketGetAllOutput = z.record(z.string(), z.unknown())

export const ticketGetAll = pikkuSessionlessFunc({
  description: "TicketGetAll",
  output: TicketGetAllOutput,
  func: async ({ freshdesk }) => {
    return freshdesk.call("GET", "/tickets") as any
  },
})
