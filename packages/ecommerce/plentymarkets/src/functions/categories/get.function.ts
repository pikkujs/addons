import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyCategorySchema } from '../../schemas.js'

export const GetCategoryInput = z.object({
  id: z.number().describe('Category ID'),
})

export const GetCategoryOutput = z.object({
  category: PlentyCategorySchema,
})

type Output = z.infer<typeof GetCategoryOutput>

export const getCategory = pikkuSessionlessFunc({
  description: 'Get a category by ID',
  node: { displayName: 'Get Category', category: 'Ecommerce', type: 'action' },
  input: GetCategoryInput,
  output: GetCategoryOutput,
  func: async ({ plentymarkets }, { id }) => {
    const category = await plentymarkets.getCategory(id)
    return { category }
  },
})
