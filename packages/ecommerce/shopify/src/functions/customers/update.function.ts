import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyCustomerSchema } from '../../schemas.js'

export const UpdateCustomerInput = z.object({
  customerId: z.string().describe('Customer ID'),
  email: z.string().optional().describe('Customer email'),
  firstName: z.string().optional().describe('First name'),
  lastName: z.string().optional().describe('Last name'),
  phone: z.string().optional().describe('Phone number'),
  tags: z.string().optional().describe('Comma-separated tags'),
  note: z.string().optional().describe('Note about the customer'),
})

export const UpdateCustomerOutput = z.object({
  customer: ShopifyCustomerSchema,
})

type Output = z.infer<typeof UpdateCustomerOutput>

export const updateCustomer = pikkuSessionlessFunc({
  description: 'Update an existing customer',
  node: { displayName: 'Update Customer', category: 'Ecommerce', type: 'action' },
  input: UpdateCustomerInput,
  output: UpdateCustomerOutput,
  func: async ({ shopify }, { customerId, email, firstName, lastName, phone, tags, note }) => {
    const result = await shopify.updateCustomer(customerId, {
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
