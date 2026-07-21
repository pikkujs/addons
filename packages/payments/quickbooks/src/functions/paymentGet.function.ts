import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PaymentGetInput = z.object({
  companyId: z.string(),
  id: z.string(),
})

export const PaymentGetOutput = z.record(z.string(), z.unknown())

export const paymentGet = pikkuSessionlessFunc({
  description: "Payment get",
  input: PaymentGetInput,
  output: PaymentGetOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("GET", "/company/{companyId}/payment/{id}", data) as any
  },
})
