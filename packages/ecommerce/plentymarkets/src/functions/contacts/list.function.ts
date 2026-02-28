import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyContactSchema } from '../../schemas.js'

export const ListContactsInput = z.object({
  email: z.string().optional().describe('Email filter'),
  typeId: z.number().optional().describe('Type ID filter'),
  plentyId: z.number().optional().describe('Plenty ID filter'),
  fullText: z.string().optional().describe('Full text search'),
  page: z.number().optional().describe('Page number'),
  itemsPerPage: z.number().optional().describe('Items per page'),
})

export const ListContactsOutput = z.object({
  page: z.number().optional(),
  totalsCount: z.number().optional(),
  isLastPage: z.boolean().optional(),
  lastPageNumber: z.number().optional(),
  firstOnPage: z.number().optional(),
  lastOnPage: z.number().optional(),
  itemsPerPage: z.number().optional(),
  entries: z.array(PlentyContactSchema),
})

type Output = z.infer<typeof ListContactsOutput>

export const listContacts = pikkuSessionlessFunc({
  description: 'List contacts with filters',
  node: {
    displayName: 'List Contacts',
    category: 'Ecommerce',
    type: 'action',
  },
  input: ListContactsInput,
  output: ListContactsOutput,
  func: async (
    { plentymarkets },
    { email, typeId, plentyId, fullText, page, itemsPerPage }
  ) => {
    const result = await plentymarkets.listContacts({
      email,
      typeId,
      plentyId,
      fullText,
      page,
      itemsPerPage,
    })
    return result
  },
})
