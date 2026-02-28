import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'

export const CorrectStockInput = z.object({
  warehouseId: z.number().describe('Warehouse ID'),
  corrections: z
    .array(
      z.object({
        variationId: z.number(),
        quantity: z.number(),
        reasonId: z.number().optional(),
        storageLocationId: z.number().optional(),
      })
    )
    .describe('Stock corrections to apply'),
})

export const CorrectStockOutput = z.object({
  success: z.boolean(),
})

type Output = z.infer<typeof CorrectStockOutput>

export const correctStock = pikkuSessionlessFunc({
  description: 'Apply stock corrections for a warehouse',
  node: {
    displayName: 'Correct Stock',
    category: 'Ecommerce',
    type: 'action',
  },
  input: CorrectStockInput,
  output: CorrectStockOutput,
  func: async ({ plentymarkets }, { warehouseId, corrections }) => {
    await plentymarkets.correctStock(warehouseId, { corrections })
    return { success: true }
  },
})
