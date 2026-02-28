import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyCustomerSchema } from '../../schemas.js'

export const CreateCustomerInput = z.object({
  email: z.string().optional().describe('Customer email'),
  firstName: z.string().optional().describe('First name'),
  lastName: z.string().optional().describe('Last name'),
  phone: z.string().optional().describe('Phone number'),
  tags: z.string().optional().describe('Comma-separated tags'),
  note: z.string().optional().describe('Note about the customer'),
})

export const CreateCustomerOutput = z.object({
  customer: ShopifyCustomerSchema,
})

type Output = z.infer<typeof CreateCustomerOutput>

export const createCustomer = pikkuSessionlessFunc({
  description: 'Create a new customer',
  node: { displayName: 'Create Customer', category: 'Ecommerce', type: 'action' },
  input: CreateCustomerInput,
  output: CreateCustomerOutput,
  func: async ({ shopify }, { email, firstName, lastName, phone, tags, note }) => {
    const result = await shopify.createCustomer({
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
      tags,
      note,
    })
    return { customer: result.customer }
  },
})
