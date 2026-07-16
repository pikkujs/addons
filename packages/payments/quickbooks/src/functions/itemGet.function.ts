import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ItemGetInput = z.object({
  companyId: z.string(),
  id: z.string(),
})

export const ItemGetOutput = z.record(z.string(), z.unknown())

export const itemGet = pikkuSessionlessFunc({
  description: "Item get",
  input: ItemGetInput,
  output: ItemGetOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/item/{id}", data) as any
  },
})
