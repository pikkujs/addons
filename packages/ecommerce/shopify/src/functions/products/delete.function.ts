import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'

export const DeleteProductInput = z.object({
  productId: z.string().describe('Product ID'),
})

export const DeleteProductOutput = z.object({
  success: z.boolean(),
})

type Output = z.infer<typeof DeleteProductOutput>

export const deleteProduct = pikkuSessionlessFunc({
  description: 'Delete a product',
  node: { displayName: 'Delete Product', category: 'Ecommerce', type: 'action' },
  input: DeleteProductInput,
  output: DeleteProductOutput,
  func: async ({ shopify }, { productId }) => {
    await shopify.deleteProduct(productId)
    return { success: true }
  },
})
