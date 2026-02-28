import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyWarehouseSchema } from '../../schemas.js'

export const GetWarehouseInput = z.object({
  id: z.number().describe('Warehouse ID'),
})

export const GetWarehouseOutput = z.object({
  warehouse: PlentyWarehouseSchema,
})

type Output = z.infer<typeof GetWarehouseOutput>

export const getWarehouse = pikkuSessionlessFunc({
  description: 'Get a warehouse by ID',
  node: {
    displayName: 'Get Warehouse',
    category: 'Ecommerce',
    type: 'action',
  },
  input: GetWarehouseInput,
  output: GetWarehouseOutput,
  func: async ({ plentymarkets }, { id }) => {
    const warehouse = await plentymarkets.getWarehouse(id)
    return { warehouse }
  },
})
