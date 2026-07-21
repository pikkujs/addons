import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, ProductSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const ProductCreateInput = z.object({
  name: z.string().describe('The product\'s name, meant to be displayable to the customer'),
  description: z.string().optional().describe('The product\'s description, meant to be displayable to the customer'),
  active: z.boolean().optional().describe('Whether the product is currently available for purchase. Defaults to true'),
  defaultPriceData: z
    .object({
      currency: z.string().describe('Three-letter ISO currency code, lowercase'),
      unitAmount: z.number().describe('A positive integer in the smallest currency unit (e.g. 500 = $5.00)'),
      recurring: z
        .object({
          interval: z.enum(['day', 'week', 'month', 'year']).describe('Billing frequency'),
          intervalCount: z.number().optional().describe('Number of intervals between billings'),
        })
        .optional()
        .describe('Provide to make the default price recurring (a subscription plan); omit for a one-time price'),
    })
    .optional()
    .describe('Create a default Price for this product inline, so you do not need a separate price create call'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the product'),
})

export const ProductCreateOutput = ProductSchema

export const productCreate = pikkuSessionlessFunc({
  description: 'Create a product to sell, optionally with a default price attached inline',
  node: { displayName: 'Create Product', category: 'Products', type: 'action' },
  input: ProductCreateInput,
  output: ProductCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.products.create({
      name: data.name,
      ...(data.description ? { description: data.description } : {}),
      ...(data.active !== undefined ? { active: data.active } : {}),
      ...(data.defaultPriceData
        ? {
            default_price_data: {
              currency: data.defaultPriceData.currency,
              unit_amount: data.defaultPriceData.unitAmount,
              ...(data.defaultPriceData.recurring
                ? {
                    recurring: {
                      interval: data.defaultPriceData.recurring.interval,
                      ...(data.defaultPriceData.recurring.intervalCount !== undefined
                        ? { interval_count: data.defaultPriceData.recurring.intervalCount }
                        : {}),
                    },
                  }
                : {}),
            },
          }
        : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    })
    const camel = fromStripeObject(result)
    return ProductCreateOutput.parse({
      ...camel,
      created: epochToIso(result.created),
      updated: epochToIso(result.updated),
    })
  },
})
