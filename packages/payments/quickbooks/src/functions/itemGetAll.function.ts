import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ItemGetAllInput = z.object({
  companyId: z.string(),
  query: z.string().optional(),
})

export const ItemGetAllOutput = z.record(z.string(), z.unknown())

export const itemGetAll = pikkuSessionlessFunc({
  description: "Item get all",
  input: ItemGetAllInput,
  output: ItemGetAllOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/item", data) as any
  },
})
