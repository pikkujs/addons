import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { PlentyPaymentSchema } from '../../schemas.js'

export const SearchOrderPaymentsInput = z.object({
  orderId: z.number().describe('Order ID whose payments to fetch'),
})

export const SearchOrderPaymentsOutput = z.object({
  entries: z.array(PlentyPaymentSchema),
})

type Output = z.infer<typeof SearchOrderPaymentsOutput>

export const searchOrderPayments = pikkuSessionlessFunc({
  description: 'List the payments booked against one order (POST /payments/search)',
  node: {
    displayName: 'Search Order Payments',
    category: 'Ecommerce',
    type: 'action',
  },
  input: SearchOrderPaymentsInput,
  output: SearchOrderPaymentsOutput,
  func: async ({ plentymarkets }, { orderId }) => {
    const result = await plentymarkets.searchOrderPayments(orderId)
    return { entries: result.entries ?? [] }
  },
})
