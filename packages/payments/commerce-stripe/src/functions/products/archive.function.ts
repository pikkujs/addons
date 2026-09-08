import { z } from 'zod'
import { pikkuFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const ArchiveProductInput = z.object({
  id: z.string().describe('The product to archive'),
})

export const ArchiveProductOutput = z.object({
  id: z.string(),
  active: z.boolean().describe('Always false'),
})

/**
 * Archive rather than delete: orders reference variants, and a deleted product
 * would leave a paid order unable to say what was bought. Stripe is archived
 * the same way, which is all its API supports for a Product with Prices.
 */
export const archiveProduct = pikkuFunc({
  description: 'Archive a product and its variants, hiding them from the storefront without breaking past orders',
  node: { displayName: 'Archive Product', category: 'Catalogue', type: 'action' },
  input: ArchiveProductInput,
  output: ArchiveProductOutput,
  tags: ['addon'],
  func: async ({ stripeApi, kysely, logger }, data) => {
    const product = await kysely
      .selectFrom('paymentProduct')
      .selectAll()
      .where('id', '=', data.id)
      .executeTakeFirst()
    if (!product) {
      throw new BadRequestError(`Unknown product ${data.id}`)
    }

    const now = new Date().toISOString()
    await kysely
      .updateTable('paymentProduct')
      .set({ active: 0, updatedAt: now })
      .where('id', '=', data.id)
      .execute()
    await kysely
      .updateTable('paymentVariant')
      .set({ active: 0, updatedAt: now })
      .where('productId', '=', data.id)
      .execute()

    if (product.stripeProductId) {
      try {
        await stripeApi.post(`/products/${product.stripeProductId}`, { active: false })
      } catch (error) {
        logger.warn(
          `product ${data.id} archived locally but Stripe refused (${(error as Error).message})`
        )
      }
    }

    return { id: data.id, active: false }
  },
})
