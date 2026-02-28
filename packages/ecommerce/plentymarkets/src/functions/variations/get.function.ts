import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyVariationSchema } from '../../schemas.js'

export const GetVariationInput = z.object({
  itemId: z.number().describe('Item ID'),
  variationId: z.number().describe('Variation ID'),
})

export const GetVariationOutput = z.object({
  variation: PlentyVariationSchema,
})

type Output = z.infer<typeof GetVariationOutput>

export const getVariation = pikkuSessionlessFunc({
  description: 'Get a variation by ID',
  node: { displayName: 'Get Variation', category: 'Ecommerce', type: 'action' },
  input: GetVariationInput,
  output: GetVariationOutput,
  func: async ({ plentymarkets }, { itemId, variationId }) => {
    const variation = await plentymarkets.getVariation(itemId, variationId)
    return { variation }
  },
})
