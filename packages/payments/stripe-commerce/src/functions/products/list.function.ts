import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListProductsInput = z.object({
  includeInactive: z
    .boolean()
    .optional()
    .describe('Include archived products and variants. Storefronts leave this false'),
  limit: z.number().int().positive().max(200).optional().describe('Defaults to 50'),
  offset: z.number().int().nonnegative().optional().describe('Defaults to 0'),
})

const VariantOutput = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string().nullable(),
  amountMinor: z.number().describe("Price in the currency's minor unit"),
  currency: z.string(),
  recurringInterval: z.enum(['day', 'week', 'month', 'year']).nullable(),
  stock: z.number().nullable().describe('Null when stock is not tracked'),
  inStock: z.boolean().describe('False only when stock is tracked and exhausted'),
  active: z.boolean(),
})

export const ListProductsOutput = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      imageUrl: z.string().nullable(),
      requiresShipping: z.boolean(),
      active: z.boolean(),
      variants: z.array(VariantOutput),
    })
  ),
})

export const listProducts = pikkuSessionlessFunc({
  description: 'List catalogue products with their variants and stock state',
  node: { displayName: 'List Products', category: 'Catalogue', type: 'action' },
  input: ListProductsInput,
  output: ListProductsOutput,
  tags: ['addon'],
  func: async ({ kysely }, data) => {
    const includeInactive = data.includeInactive ?? false
    let productQuery = kysely.selectFrom('paymentProduct').selectAll().orderBy('name', 'asc')
    if (!includeInactive) {
      productQuery = productQuery.where('active', '=', 1)
    }
    const products = await productQuery
      .limit(data.limit ?? 50)
      .offset(data.offset ?? 0)
      .execute()

    if (products.length === 0) {
      return { products: [] }
    }

    let variantQuery = kysely
      .selectFrom('paymentVariant')
      .selectAll()
      .where(
        'productId',
        'in',
        products.map((product) => product.id)
      )
      .orderBy('position', 'asc')
    if (!includeInactive) {
      variantQuery = variantQuery.where('active', '=', 1)
    }
    const variants = await variantQuery.execute()

    return {
      products: products.map((product) => ({
        id: product.id,
        slug: product.slug,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        requiresShipping: product.requiresShipping === 1,
        active: product.active === 1,
        variants: variants
          .filter((variant) => variant.productId === product.id)
          .map((variant) => ({
            id: variant.id,
            name: variant.name,
            sku: variant.sku,
            amountMinor: variant.amountMinor,
            currency: variant.currency,
            recurringInterval: variant.recurringInterval,
            stock: variant.stock,
            inStock: variant.stock === null || variant.stock > 0,
            active: variant.active === 1,
          })),
      })),
    }
  },
})
