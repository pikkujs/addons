import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyVariationSchema } from '../../schemas.js'

export const UpdateVariationInput = z.object({
  itemId: z.number().describe('Item ID'),
  variationId: z.number().describe('Variation ID'),
  number: z.string().optional(),
  model: z.string().optional(),
  externalId: z.string().optional(),
  isMain: z.boolean().optional(),
  isActive: z.boolean().optional(),
  availability: z.number().optional(),
  purchasePrice: z.number().optional(),
  mainWarehouseId: z.number().optional(),
  weightG: z.number().optional(),
  widthMM: z.number().optional(),
  lengthMM: z.number().optional(),
  heightMM: z.number().optional(),
  position: z.number().optional(),
})

export const UpdateVariationOutput = z.object({
  variation: PlentyVariationSchema,
})

type Output = z.infer<typeof UpdateVariationOutput>

export const updateVariation = pikkuSessionlessFunc({
  description: 'Update an existing variation',
  node: {
    displayName: 'Update Variation',
    category: 'Ecommerce',
    type: 'action',
  },
  input: UpdateVariationInput,
  output: UpdateVariationOutput,
  func: async ({ plentymarkets }, input) => {
    const { itemId, variationId, ...body } = input
    const variation = await plentymarkets.updateVariation(
      itemId,
      variationId,
      body
    )
    return { variation }
  },
})
