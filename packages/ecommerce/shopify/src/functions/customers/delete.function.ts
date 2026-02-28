import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'

export const DeleteCustomerInput = z.object({
  customerId: z.string().describe('Customer ID'),
})

export const DeleteCustomerOutput = z.object({
  success: z.boolean().describe('Whether deletion was successful'),
})

type Output = z.infer<typeof DeleteCustomerOutput>

export const deleteCustomer = pikkuSessionlessFunc({
  description: 'Delete a customer',
  node: { displayName: 'Delete Customer', category: 'Ecommerce', type: 'action' },
  input: DeleteCustomerInput,
  output: DeleteCustomerOutput,
  func: async ({ shopify }, { customerId }) => {
    await shopify.deleteCustomer(customerId)
    return { success: true }
  },
})
