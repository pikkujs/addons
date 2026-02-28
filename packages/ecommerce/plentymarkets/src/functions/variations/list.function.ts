import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyVariationSchema } from '../../schemas.js'

export const ListVariationsInput = z.object({
  itemId: z.number().describe('Item ID'),
  isMain: z.boolean().optional(),
  isActive: z.boolean().optional(),
  barcode: z.string().optional(),
  numberExact: z.string().optional().describe('Exact variation number'),
  page: z.number().optional(),
  itemsPerPage: z.number().optional(),
})

export const ListVariationsOutput = z.object({
  page: z.number().optional(),
  totalsCount: z.number().optional(),
  isLastPage: z.boolean().optional(),
  lastPageNumber: z.number().optional(),
  firstOnPage: z.number().optional(),
  lastOnPage: z.number().optional(),
  itemsPerPage: z.number().optional(),
  entries: z.array(PlentyVariationSchema),
})

type Output = z.infer<typeof ListVariationsOutput>

export const listVariations = pikkuSessionlessFunc({
  description: 'List variations for an item',
  node: {
    displayName: 'List Variations',
    category: 'Ecommerce',
    type: 'action',
  },
  input: ListVariationsInput,
  output: ListVariationsOutput,
  func: async ({ plentymarkets }, input) => {
    const { itemId, ...params } = input
    const result = await plentymarkets.listVariations(itemId, params)
    return result
  },
})
