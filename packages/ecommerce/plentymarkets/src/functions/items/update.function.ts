import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyItemSchema } from '../../schemas.js'

export const UpdateItemInput = z.object({
  itemId: z.number().describe('Item ID'),
  itemType: z.string().optional(),
  stockType: z.number().optional(),
  storeSpecial: z.number().optional(),
  ownerId: z.number().optional(),
  manufacturerId: z.number().optional(),
  condition: z.number().optional(),
  flagOne: z.number().optional(),
  flagTwo: z.number().optional(),
})

export const UpdateItemOutput = z.object({
  item: PlentyItemSchema,
})

type Output = z.infer<typeof UpdateItemOutput>

export const updateItem = pikkuSessionlessFunc({
  description: 'Update an existing item',
  node: {
    displayName: 'Update Item',
    category: 'Ecommerce',
    type: 'action',
  },
  input: UpdateItemInput,
  output: UpdateItemOutput,
  func: async ({ plentymarkets }, input) => {
    const { itemId, ...body } = input
    const item = await plentymarkets.updateItem(itemId, body)
    return { item }
  },
})
