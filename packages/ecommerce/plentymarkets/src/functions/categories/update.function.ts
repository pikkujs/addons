import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyCategorySchema } from '../../schemas.js'

export const UpdateCategoryInput = z.object({
  id: z.number().describe('Category ID'),
  type: z.string().optional(),
  parentCategoryId: z.number().optional(),
  linklist: z.boolean().optional(),
  right: z.string().optional(),
  sitemap: z.boolean().optional(),
  details: z
    .array(
      z.object({
        lang: z.string(),
        name: z.string(),
        description: z.string().optional(),
        shortDescription: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      })
    )
    .optional(),
})

export const UpdateCategoryOutput = z.object({
  category: PlentyCategorySchema,
})

type Output = z.infer<typeof UpdateCategoryOutput>

export const updateCategory = pikkuSessionlessFunc({
  description: 'Update an existing category',
  node: {
    displayName: 'Update Category',
    category: 'Ecommerce',
    type: 'action',
  },
  input: UpdateCategoryInput,
  output: UpdateCategoryOutput,
  func: async ({ plentymarkets }, input) => {
    const { id, ...body } = input
    const category = await plentymarkets.updateCategory(id, body)
    return { category }
  },
})
