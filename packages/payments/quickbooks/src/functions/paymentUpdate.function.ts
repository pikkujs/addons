import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PaymentUpdateInput = z.object({
  companyId: z.string(),
  Id: z.string().optional(),
  SyncToken: z.string().optional(),
  CustomerRef: z.string().optional(),
})

export const PaymentUpdateOutput = z.record(z.string(), z.unknown())

export const paymentUpdate = pikkuSessionlessFunc({
  description: "Payment update",
  input: PaymentUpdateInput,
  output: PaymentUpdateOutput,
  func: async ({ quickbooks }, data) => {
    return quickbooks.call("POST", "/company/{companyId}/payment/update", data) as any
  },
})
