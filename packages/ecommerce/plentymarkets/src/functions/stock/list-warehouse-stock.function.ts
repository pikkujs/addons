import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyStockEntrySchema } from '../../schemas.js'

export const ListWarehouseStockInput = z.object({
  warehouseId: z.number().describe('Warehouse ID'),
  variationId: z.number().optional().describe('Variation ID filter'),
  itemId: z.number().optional().describe('Item ID filter'),
  page: z.number().optional().describe('Page number'),
  itemsPerPage: z.number().optional().describe('Items per page'),
})

export const ListWarehouseStockOutput = z.object({
  page: z.number().optional(),
  totalsCount: z.number().optional(),
  isLastPage: z.boolean().optional(),
  lastPageNumber: z.number().optional(),
  firstOnPage: z.number().optional(),
  lastOnPage: z.number().optional(),
  itemsPerPage: z.number().optional(),
  entries: z.array(PlentyStockEntrySchema),
})

type Output = z.infer<typeof ListWarehouseStockOutput>

export const listWarehouseStock = pikkuSessionlessFunc({
  description: 'List stock for a specific warehouse',
  node: {
    displayName: 'List Warehouse Stock',
    category: 'Ecommerce',
    type: 'action',
  },
  input: ListWarehouseStockInput,
  output: ListWarehouseStockOutput,
  func: async ({ plentymarkets }, input) => {
    const { warehouseId, ...params } = input
    const result = await plentymarkets.listWarehouseStock(warehouseId, params)
    return result
  },
})
