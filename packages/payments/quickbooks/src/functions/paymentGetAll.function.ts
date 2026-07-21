import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaymentGetAllInput = z.object({
  companyId: z.string(),
  query: z.string().optional(),
})

export const PaymentGetAllOutput = z.record(z.string(), z.unknown())

export const paymentGetAll = pikkuSessionlessFunc({
  description: "Payment get all",
  input: PaymentGetAllInput,
  output: PaymentGetAllOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/payment", data) as any
  },
})
