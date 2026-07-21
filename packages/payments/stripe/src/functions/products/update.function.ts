import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, ProductSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const ProductUpdateInput = z.object({
  productId: z.string().describe('The identifier of the product to update (prod_...)'),
  name: z.string().optional().describe('The product\'s name, meant to be displayable to the customer'),
  description: z.string().optional().describe('The product\'s description, meant to be displayable to the customer'),
  active: z.boolean().optional().describe('Whether the product is currently available for purchase. Set false to archive it'),
  defaultPrice: z.string().optional().describe('The ID of the Price to make the default price for this product'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the product'),
})

export const ProductUpdateOutput = ProductSchema

export const productUpdate = pikkuSessionlessFunc({
  description: 'Update an existing product, for example to archive it or change its default price',
  node: { displayName: 'Update Product', category: 'Products', type: 'action' },
  input: ProductUpdateInput,
  output: ProductUpdateOutput,
  func: async ({ stripe }, { productId, ...data }) => {
    const result = await stripe.products.update(productId, {
      ...(data.name ? { name: data.name } : {}),
      ...(data.description ? { description: data.description } : {}),
      ...(data.active !== undefined ? { active: data.active } : {}),
      ...(data.defaultPrice ? { default_price: data.defaultPrice } : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    })
    const camel = fromStripeObject(result)
    return ProductUpdateOutput.parse({
      ...camel,
      created: epochToIso(result.created),
      updated: epochToIso(result.updated),
    })
  },
})
