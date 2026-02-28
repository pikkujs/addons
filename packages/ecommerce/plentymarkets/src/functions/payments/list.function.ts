import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyPaymentSchema } from '../../schemas.js'

export const ListPaymentsInput = z.object({
  page: z.number().optional().describe('Page number'),
  itemsPerPage: z.number().optional().describe('Items per page'),
})

export const ListPaymentsOutput = z.object({
  page: z.number().optional(),
  totalsCount: z.number().optional(),
  isLastPage: z.boolean().optional(),
  lastPageNumber: z.number().optional(),
  firstOnPage: z.number().optional(),
  lastOnPage: z.number().optional(),
  itemsPerPage: z.number().optional(),
  entries: z.array(PlentyPaymentSchema),
})

type Output = z.infer<typeof ListPaymentsOutput>

export const listPayments = pikkuSessionlessFunc({
  description: 'List payments',
  node: {
    displayName: 'List Payments',
    category: 'Ecommerce',
    type: 'action',
  },
  input: ListPaymentsInput,
  output: ListPaymentsOutput,
  func: async ({ plentymarkets }, { page, itemsPerPage }) => {
    const result = await plentymarkets.listPayments({ page, itemsPerPage })
    return result
  },
})
