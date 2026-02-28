import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyCategorySchema } from '../../schemas.js'

export const CreateCategoryInput = z.object({
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

export const CreateCategoryOutput = z.object({
  category: PlentyCategorySchema,
})

type Output = z.infer<typeof CreateCategoryOutput>

export const createCategory = pikkuSessionlessFunc({
  description: 'Create a new category',
  node: {
    displayName: 'Create Category',
    category: 'Ecommerce',
    type: 'action',
  },
  input: CreateCategoryInput,
  output: CreateCategoryOutput,
  func: async (
    { plentymarkets },
    { type, parentCategoryId, linklist, right, sitemap, details }
  ) => {
    const category = await plentymarkets.createCategory({
      type,
      parentCategoryId,
      linklist,
      right,
      sitemap,
      details,
    })
    return { category }
  },
})
