import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyCustomerSchema } from '../../schemas.js'

export const ListCustomersInput = z.object({
  limit: z.number().optional().describe('Maximum number of customers to return'),
  sinceId: z.string().optional().describe('Return customers after this ID'),
  query: z.string().optional().describe('Search query'),
})

export const ListCustomersOutput = z.object({
  customers: z.array(ShopifyCustomerSchema),
})

type Output = z.infer<typeof ListCustomersOutput>

export const listCustomers = pikkuSessionlessFunc({
  description: 'List all customers',
  node: { displayName: 'List Customers', category: 'Ecommerce', type: 'action' },
  input: ListCustomersInput,
  output: ListCustomersOutput,
  func: async ({ shopify }, { limit, sinceId, query }) => {
    const result = await shopify.listCustomers({
      limit,
      since_id: sinceId,
      query,
    })
    return { customers: result.customers }
  },
})
