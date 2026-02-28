import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyWarehouseSchema } from '../../schemas.js'

export const ListWarehousesInput = z.object({})

export const ListWarehousesOutput = z.object({
  warehouses: z.array(PlentyWarehouseSchema),
})

type Output = z.infer<typeof ListWarehousesOutput>

export const listWarehouses = pikkuSessionlessFunc({
  description: 'List all warehouses',
  node: {
    displayName: 'List Warehouses',
    category: 'Ecommerce',
    type: 'action',
  },
  input: ListWarehousesInput,
  output: ListWarehousesOutput,
  func: async ({ plentymarkets }) => {
    const warehouses = await plentymarkets.listWarehouses()
    return { warehouses }
  },
})
