import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PaymentCreateInput = z.object({
  companyId: z.string(),
  CustomerRef: z.string().optional(),
  TotalAmt: z.number().optional(),
})

export const PaymentCreateOutput = z.record(z.string(), z.unknown())

export const paymentCreate = pikkuSessionlessFunc({
  description: "Payment create",
  input: PaymentCreateInput,
  output: PaymentCreateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/payment", data) as any
  },
})
