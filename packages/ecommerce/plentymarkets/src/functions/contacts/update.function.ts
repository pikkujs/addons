import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyContactSchema } from '../../schemas.js'

export const UpdateContactInput = z.object({
  id: z.number().describe('Contact ID'),
  typeId: z.number().optional().describe('Contact type ID'),
  firstName: z.string().optional().describe('First name'),
  lastName: z.string().optional().describe('Last name'),
  email: z.string().optional().describe('Email address'),
  gender: z.string().optional().describe('Gender'),
  title: z.string().optional().describe('Title'),
  lang: z.string().optional().describe('Language'),
  classId: z.number().optional().describe('Class ID'),
  referrerId: z.number().optional().describe('Referrer ID'),
})

export const UpdateContactOutput = z.object({
  contact: PlentyContactSchema,
})

type Output = z.infer<typeof UpdateContactOutput>

export const updateContact = pikkuSessionlessFunc({
  description: 'Update an existing contact',
  node: {
    displayName: 'Update Contact',
    category: 'Ecommerce',
    type: 'action',
  },
  input: UpdateContactInput,
  output: UpdateContactOutput,
  func: async ({ plentymarkets }, input) => {
    const { id, ...body } = input
    const contact = await plentymarkets.updateContact(id, body)
    return { contact }
  },
})
