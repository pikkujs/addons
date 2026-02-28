import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyPaymentSchema } from '../../schemas.js'

export const GetPaymentInput = z.object({
  id: z.number().describe('Payment ID'),
})

export const GetPaymentOutput = z.object({
  payment: PlentyPaymentSchema,
})

type Output = z.infer<typeof GetPaymentOutput>

export const getPayment = pikkuSessionlessFunc({
  description: 'Get a payment by ID',
  node: {
    displayName: 'Get Payment',
    category: 'Ecommerce',
    type: 'action',
  },
  input: GetPaymentInput,
  output: GetPaymentOutput,
  func: async ({ plentymarkets }, { id }) => {
    const payment = await plentymarkets.getPayment(id)
    return { payment }
  },
})
