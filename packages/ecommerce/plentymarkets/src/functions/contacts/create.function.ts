import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyContactSchema } from '../../schemas.js'

export const CreateContactInput = z.object({
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

export const CreateContactOutput = z.object({
  contact: PlentyContactSchema,
})

type Output = z.infer<typeof CreateContactOutput>

export const createContact = pikkuSessionlessFunc({
  description: 'Create a new contact',
  node: {
    displayName: 'Create Contact',
    category: 'Ecommerce',
    type: 'action',
  },
  input: CreateContactInput,
  output: CreateContactOutput,
  func: async (
    { plentymarkets },
    { typeId, firstName, lastName, email, gender, title, lang, classId, referrerId }
  ) => {
    const contact = await plentymarkets.createContact({
      typeId,
      firstName,
      lastName,
      email,
      gender,
      title,
      lang,
      classId,
      referrerId,
    })
    return { contact }
  },
})
