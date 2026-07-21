import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, ProductSchema } from '../../stripe.types.js'

export const ProductCreateInput = z.object({
  name: z.string().describe('The product\'s name, meant to be displayable to the customer'),
  description: z.string().optional().describe('The product\'s description, meant to be displayable to the customer'),
  active: z.boolean().optional().describe('Whether the product is currently available for purchase. Defaults to true'),
  default_price_data: z
    .object({
      currency: z.string().describe('Three-letter ISO currency code, lowercase'),
      unit_amount: z.number().describe('A positive integer in the smallest currency unit (e.g. 500 = $5.00)'),
      recurring: z
        .object({
          interval: z.enum(['day', 'week', 'month', 'year']).describe('Billing frequency'),
          interval_count: z.number().optional().describe('Number of intervals between billings'),
        })
        .optional()
        .describe('Provide to make the default price recurring (a subscription plan); omit for a one-time price'),
    })
    .optional()
    .describe('Create a default Price for this product inline, so you do not need a separate price create call'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the product'),
})

export const ProductCreateOutput = ProductSchema

type Output = z.infer<typeof ProductCreateOutput>

export const productCreate = pikkuSessionlessFunc({
  description: 'Create a product to sell, optionally with a default price attached inline',
  node: { displayName: 'Create Product', category: 'Products', type: 'action' },
  input: ProductCreateInput,
  output: ProductCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.products.create({
      name: data.name,
      ...(data.description ? { description: data.description } : {}),
      ...(data.active !== undefined ? { active: data.active } : {}),
      ...(data.default_price_data ? { default_price_data: data.default_price_data } : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    }) as unknown as Output
  },
})
