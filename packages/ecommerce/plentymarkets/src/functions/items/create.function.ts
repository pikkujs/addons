import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyItemSchema } from '../../schemas.js'

export const CreateItemInput = z.object({
  itemType: z.string().optional().describe('Item type'),
  stockType: z.number().optional(),
  storeSpecial: z.number().optional(),
  ownerId: z.number().optional(),
  manufacturerId: z.number().optional(),
  condition: z.number().optional(),
  flagOne: z.number().optional(),
  flagTwo: z.number().optional(),
})

export const CreateItemOutput = z.object({
  item: PlentyItemSchema,
})

type Output = z.infer<typeof CreateItemOutput>

export const createItem = pikkuSessionlessFunc({
  description: 'Create a new item',
  node: {
    displayName: 'Create Item',
    category: 'Ecommerce',
    type: 'action',
  },
  input: CreateItemInput,
  output: CreateItemOutput,
  func: async (
    { plentymarkets },
    {
      itemType,
      stockType,
      storeSpecial,
      ownerId,
      manufacturerId,
      condition,
      flagOne,
      flagTwo,
    }
  ) => {
    const item = await plentymarkets.createItem({
      itemType,
      stockType,
      storeSpecial,
      ownerId,
      manufacturerId,
      condition,
      flagOne,
      flagTwo,
    })
    return { item }
  },
})
