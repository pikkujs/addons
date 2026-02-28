import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyItemSchema } from '../../schemas.js'

export const ListItemsInput = z.object({
  name: z.string().optional().describe('Item name filter'),
  manufacturerId: z.number().optional().describe('Manufacturer ID filter'),
  flagOne: z.number().optional().describe('Flag one filter'),
  flagTwo: z.number().optional().describe('Flag two filter'),
  updatedBetween: z.string().optional().describe('Date range filter'),
  page: z.number().optional().describe('Page number'),
  itemsPerPage: z.number().optional().describe('Items per page'),
})

export const ListItemsOutput = z.object({
  page: z.number().optional(),
  totalsCount: z.number().optional(),
  isLastPage: z.boolean().optional(),
  lastPageNumber: z.number().optional(),
  firstOnPage: z.number().optional(),
  lastOnPage: z.number().optional(),
  itemsPerPage: z.number().optional(),
  entries: z.array(PlentyItemSchema),
})

type Output = z.infer<typeof ListItemsOutput>

export const listItems = pikkuSessionlessFunc({
  description: 'List items with filters',
  node: { displayName: 'List Items', category: 'Ecommerce', type: 'action' },
  input: ListItemsInput,
  output: ListItemsOutput,
  func: async (
    { plentymarkets },
    {
      name,
      manufacturerId,
      flagOne,
      flagTwo,
      updatedBetween,
      page,
      itemsPerPage,
    }
  ) => {
    const result = await plentymarkets.listItems({
      name,
      manufacturerId,
      flagOne,
      flagTwo,
      updatedBetween,
      page,
      itemsPerPage,
    })
    return result
  },
})
