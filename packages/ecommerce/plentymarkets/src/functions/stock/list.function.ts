import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyStockEntrySchema } from '../../schemas.js'

export const ListStockInput = z.object({
  variationId: z.number().optional().describe('Variation ID filter'),
  itemId: z.number().optional().describe('Item ID filter'),
  warehouseId: z.number().optional().describe('Warehouse ID filter'),
  page: z.number().optional().describe('Page number'),
  itemsPerPage: z.number().optional().describe('Items per page'),
})

export const ListStockOutput = z.object({
  page: z.number().optional(),
  totalsCount: z.number().optional(),
  isLastPage: z.boolean().optional(),
  lastPageNumber: z.number().optional(),
  firstOnPage: z.number().optional(),
  lastOnPage: z.number().optional(),
  itemsPerPage: z.number().optional(),
  entries: z.array(PlentyStockEntrySchema),
})

type Output = z.infer<typeof ListStockOutput>

export const listStock = pikkuSessionlessFunc({
  description: 'List stock entries with filters',
  node: { displayName: 'List Stock', category: 'Ecommerce', type: 'action' },
  input: ListStockInput,
  output: ListStockOutput,
  func: async (
    { plentymarkets },
    { variationId, itemId, warehouseId, page, itemsPerPage }
  ) => {
    const result = await plentymarkets.listStock({
      variationId,
      itemId,
      warehouseId,
      page,
      itemsPerPage,
    })
    return result
  },
})
