import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyOrderSchema } from '../../schemas.js'

export const ListOrdersInput = z.object({
  orderType: z.number().optional().describe('Order type filter'),
  contactId: z.number().optional().describe('Contact ID filter'),
  statusFrom: z.number().optional().describe('Status range start'),
  statusTo: z.number().optional().describe('Status range end'),
  createdAtFrom: z.string().optional().describe('Created at from date'),
  createdAtTo: z.string().optional().describe('Created at to date'),
  updatedAtFrom: z.string().optional().describe('Updated at from date'),
  updatedAtTo: z.string().optional().describe('Updated at to date'),
  page: z.number().optional().describe('Page number'),
  itemsPerPage: z.number().optional().describe('Items per page'),
})

export const ListOrdersOutput = z.object({
  page: z.number().optional(),
  totalsCount: z.number().optional(),
  isLastPage: z.boolean().optional(),
  lastPageNumber: z.number().optional(),
  firstOnPage: z.number().optional(),
  lastOnPage: z.number().optional(),
  itemsPerPage: z.number().optional(),
  entries: z.array(PlentyOrderSchema),
})

type Output = z.infer<typeof ListOrdersOutput>

export const listOrders = pikkuSessionlessFunc({
  description: 'List orders with optional filters',
  node: { displayName: 'List Orders', category: 'Ecommerce', type: 'action' },
  input: ListOrdersInput,
  output: ListOrdersOutput,
  func: async (
    { plentymarkets },
    {
      orderType,
      contactId,
      statusFrom,
      statusTo,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
      page,
      itemsPerPage,
    }
  ) => {
    const result = await plentymarkets.listOrders({
      orderType,
      contactId,
      statusFrom,
      statusTo,
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
      page,
      itemsPerPage,
    })
    return result
  },
})
