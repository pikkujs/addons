import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyPaymentSchema } from '../../schemas.js'

export const CreatePaymentInput = z.object({
  amount: z.number().describe('Payment amount'),
  currency: z.string().describe('Currency code'),
  mopId: z.number().describe('Method of payment ID'),
  type: z.string().optional().describe('Payment type'),
  status: z.number().optional().describe('Payment status'),
  transactionType: z.number().optional().describe('Transaction type'),
  parentId: z.number().optional().describe('Parent payment ID'),
})

export const CreatePaymentOutput = z.object({
  payment: PlentyPaymentSchema,
})

type Output = z.infer<typeof CreatePaymentOutput>

export const createPayment = pikkuSessionlessFunc({
  description: 'Create a new payment',
  node: {
    displayName: 'Create Payment',
    category: 'Ecommerce',
    type: 'action',
  },
  input: CreatePaymentInput,
  output: CreatePaymentOutput,
  func: async (
    { plentymarkets },
    { amount, currency, mopId, type, status, transactionType, parentId }
  ) => {
    const payment = await plentymarkets.createPayment({
      amount,
      currency,
      mopId,
      type,
      status,
      transactionType,
      parentId,
    })
    return { payment }
  },
})
