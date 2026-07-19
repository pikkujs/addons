import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyVariationSyncDataSchema } from '../../schemas.js'

export const GetVariationSyncDataInput = z.object({
  variationId: z.number().describe('Variation ID whose prices + availability to resolve'),
})

export const GetVariationSyncDataOutput = PlentyVariationSyncDataSchema

export const getVariationSyncData = pikkuSessionlessFunc({
  description:
    "Resolve a variation's per-currency gross prices and availability id — the data a catalog resync writes (GET /items/variations/{id} with sales prices).",
  node: {
    displayName: 'Get Variation Sync Data',
    category: 'Ecommerce',
    type: 'action',
  },
  input: GetVariationSyncDataInput,
  output: GetVariationSyncDataOutput,
  func: async ({ plentymarkets }, { variationId }) => {
    return plentymarkets.getVariationSyncData(variationId)
  },
})
