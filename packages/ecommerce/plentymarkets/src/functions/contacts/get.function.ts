import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyContactSchema } from '../../schemas.js'

export const GetContactInput = z.object({
  id: z.number().describe('Contact ID'),
})

export const GetContactOutput = z.object({
  contact: PlentyContactSchema,
})

type Output = z.infer<typeof GetContactOutput>

export const getContact = pikkuSessionlessFunc({
  description: 'Get a contact by ID',
  node: {
    displayName: 'Get Contact',
    category: 'Ecommerce',
    type: 'action',
  },
  input: GetContactInput,
  output: GetContactOutput,
  func: async ({ plentymarkets }, { id }) => {
    const contact = await plentymarkets.getContact(id)
    return { contact }
  },
})
