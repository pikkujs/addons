import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyVariationSchema } from '../../schemas.js'

export const CreateVariationInput = z.object({
  itemId: z.number().describe('Item ID'),
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

export const CreateVariationOutput = z.object({
  variation: PlentyVariationSchema,
})

type Output = z.infer<typeof CreateVariationOutput>

export const createVariation = pikkuSessionlessFunc({
  description: 'Create a new variation for an item',
  node: {
    displayName: 'Create Variation',
    category: 'Ecommerce',
    type: 'action',
  },
  input: CreateVariationInput,
  output: CreateVariationOutput,
  func: async ({ plentymarkets }, input) => {
    const { itemId, ...body } = input
    const variation = await plentymarkets.createVariation(itemId, body)
    return { variation }
  },
})
