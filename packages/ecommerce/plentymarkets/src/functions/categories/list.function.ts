import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyCategorySchema } from '../../schemas.js'

export const ListCategoriesInput = z.object({
  type: z.string().optional().describe('Category type'),
  parentId: z.number().optional(),
  plentyId: z.number().optional(),
  name: z.string().optional(),
  level: z.number().optional(),
  page: z.number().optional(),
  itemsPerPage: z.number().optional(),
})

export const ListCategoriesOutput = z.object({
  page: z.number().optional(),
  totalsCount: z.number().optional(),
  isLastPage: z.boolean().optional(),
  lastPageNumber: z.number().optional(),
  firstOnPage: z.number().optional(),
  lastOnPage: z.number().optional(),
  itemsPerPage: z.number().optional(),
  entries: z.array(PlentyCategorySchema),
})

type Output = z.infer<typeof ListCategoriesOutput>

export const listCategories = pikkuSessionlessFunc({
  description: 'List categories with filters',
  node: {
    displayName: 'List Categories',
    category: 'Ecommerce',
    type: 'action',
  },
  input: ListCategoriesInput,
  output: ListCategoriesOutput,
  func: async (
    { plentymarkets },
    { type, parentId, plentyId, name, level, page, itemsPerPage }
  ) => {
    const result = await plentymarkets.listCategories({
      type,
      parentId,
      plentyId,
      name,
      level,
      page,
      itemsPerPage,
    })
    return result
  },
})
