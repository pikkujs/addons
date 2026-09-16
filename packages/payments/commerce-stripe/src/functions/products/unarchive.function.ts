import { z } from 'zod'
import { pikkuFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const UnarchiveProductInput = z.object({
  id: z.string().describe('The product to unarchive'),
  account: z
    .string()
    .optional()
    .describe('Which Stripe account to mirror the unarchive onto. Unset means the default account'),
})

export const UnarchiveProductOutput = z.object({
  id: z.string(),
  active: z.boolean().describe('Always true'),
})

/**
 * The inverse of archive: return a product and its variants to the storefront,
 * and un-archive it on Stripe. Same reasoning as archive — nothing is deleted.
 */
export const unarchiveProduct = pikkuFunc({
  description: 'Unarchive a product and its variants, returning them to the storefront',
  node: { displayName: 'Unarchive Product', category: 'Catalogue', type: 'action' },
  input: UnarchiveProductInput,
  output: UnarchiveProductOutput,
  tags: ['addon'],
  func: async ({ stripeApiFor, kysely, logger }, data) => {
    const stripeApi = stripeApiFor(data.account)
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
      .set({ active: 1, updatedAt: now })
      .where('id', '=', data.id)
      .execute()
    await kysely
      .updateTable('paymentVariant')
      .set({ active: 1, updatedAt: now })
      .where('productId', '=', data.id)
      .execute()

    if (product.stripeProductId) {
      try {
        await stripeApi.post(`/products/${product.stripeProductId}`, { active: true })
      } catch (error) {
        logger.warn(
          `product ${data.id} unarchived locally but Stripe refused (${(error as Error).message})`
        )
      }
    }

    return { id: data.id, active: true }
  },
})
