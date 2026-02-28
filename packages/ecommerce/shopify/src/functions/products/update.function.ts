import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyProductSchema } from '../../schemas.js'

export const UpdateProductInput = z.object({
  productId: z.string().describe('Product ID'),
  title: z.string().optional().describe('Product title'),
  bodyHtml: z.string().optional().describe('Product description (HTML)'),
  vendor: z.string().optional().describe('Product vendor'),
  productType: z.string().optional().describe('Product type'),
  status: z.enum(['active', 'archived', 'draft']).optional().describe('Product status'),
  tags: z.string().optional().describe('Comma-separated tags'),
})

export const UpdateProductOutput = z.object({
  product: ShopifyProductSchema,
})

type Output = z.infer<typeof UpdateProductOutput>

export const updateProduct = pikkuSessionlessFunc({
  description: 'Update an existing product',
  node: { displayName: 'Update Product', category: 'Ecommerce', type: 'action' },
  input: UpdateProductInput,
  output: UpdateProductOutput,
  func: async ({ shopify }, { productId, title, bodyHtml, vendor, productType, status, tags }) => {
    const result = await shopify.updateProduct(productId, {
      title,
      body_html: bodyHtml,
      vendor,
      product_type: productType,
      status,
      tags,
    })
    return { product: result.product }
  },
})
