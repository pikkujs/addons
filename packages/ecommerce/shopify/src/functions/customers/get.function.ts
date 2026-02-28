import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyCustomerSchema } from '../../schemas.js'

export const GetCustomerInput = z.object({
  customerId: z.string().describe('Customer ID'),
})

export const GetCustomerOutput = z.object({
  customer: ShopifyCustomerSchema,
})

type Output = z.infer<typeof GetCustomerOutput>

export const getCustomer = pikkuSessionlessFunc({
  description: 'Get a customer by ID',
  node: { displayName: 'Get Customer', category: 'Ecommerce', type: 'action' },
  input: GetCustomerInput,
  output: GetCustomerOutput,
  func: async ({ shopify }, { customerId }) => {
    const result = await shopify.getCustomer(customerId)
    return { customer: result.customer }
  },
})
