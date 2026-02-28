import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { ShopifyProductSchema } from '../../schemas.js'

export const CreateProductInput = z.object({
  title: z.string().describe('Product title'),
  bodyHtml: z.string().optional().describe('Product description (HTML)'),
  vendor: z.string().optional().describe('Product vendor'),
  productType: z.string().optional().describe('Product type'),
  status: z.enum(['active', 'archived', 'draft']).optional().describe('Product status'),
  tags: z.string().optional().describe('Comma-separated tags'),
})

export const CreateProductOutput = z.object({
  product: ShopifyProductSchema,
})

type Output = z.infer<typeof CreateProductOutput>

export const createProduct = pikkuSessionlessFunc({
  description: 'Create a new product',
  node: { displayName: 'Create Product', category: 'Ecommerce', type: 'action' },
  input: CreateProductInput,
  output: CreateProductOutput,
  func: async ({ shopify }, { title, bodyHtml, vendor, productType, status, tags }) => {
    const result = await shopify.createProduct({
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
