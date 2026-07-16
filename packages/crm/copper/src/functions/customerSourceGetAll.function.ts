import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomerSourceGetAllOutput = z.record(z.string(), z.unknown())

export const customerSourceGetAll = pikkuSessionlessFunc({
  description: "List customer sources",
  output: CustomerSourceGetAllOutput,
  func: async ({ copper }) => {
    return copper.call("GET", "/customer_sources") as any
  },
})
