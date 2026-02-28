import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyInventoryLevelSchema } from '../../schemas.js'

export const AdjustInventoryInput = z.object({
  inventoryItemId: z.string().describe('Inventory item ID'),
  locationId: z.string().describe('Location ID'),
  adjustment: z.number().describe('Adjustment amount (positive or negative)'),
})

export const AdjustInventoryOutput = z.object({
  inventoryLevel: ShopifyInventoryLevelSchema,
})

type Output = z.infer<typeof AdjustInventoryOutput>

export const adjustInventory = pikkuSessionlessFunc({
  description: 'Adjust inventory levels for a product',
  node: { displayName: 'Adjust Inventory', category: 'Ecommerce', type: 'action' },
  input: AdjustInventoryInput,
  output: AdjustInventoryOutput,
  func: async ({ shopify }, { inventoryItemId, locationId, adjustment }) => {
    const result = await shopify.adjustInventory(inventoryItemId, locationId, adjustment)
    return { inventoryLevel: result.inventory_level }
  },
})
