import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyItemSchema } from '../../schemas.js'

export const GetItemInput = z.object({
  itemId: z.number().describe('Item ID'),
})

export const GetItemOutput = z.object({
  item: PlentyItemSchema,
})

type Output = z.infer<typeof GetItemOutput>

export const getItem = pikkuSessionlessFunc({
  description: 'Get an item by ID',
  node: { displayName: 'Get Item', category: 'Ecommerce', type: 'action' },
  input: GetItemInput,
  output: GetItemOutput,
  func: async ({ plentymarkets }, { itemId }) => {
    const item = await plentymarkets.getItem(itemId)
    return { item }
  },
})
