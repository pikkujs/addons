import { z } from 'zod'
import { pikkuFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import { pushProduct, syncVariantPrice } from '../../lib/stripe-catalog.js'

const VariantInput = z.object({
  id: z.string().optional().describe('Omit to add a new variant, provide to update an existing one'),
  name: z.string().describe('Variant name, e.g. "Large" or "Annual". Use the product name for a single-variant product'),
  sku: z.string().optional().describe('Your own stock keeping unit. Must be unique across the catalogue'),
  amountMinor: z
    .number()
    .int()
    .nonnegative()
    .describe("Price in the currency's minor unit (500 = $5.00, but 500 = ¥500 for JPY)"),
  currency: z.string().describe('Three-letter ISO currency code, lowercase'),
  recurringInterval: z
    .enum(['day', 'week', 'month', 'year'])
    .optional()
    .describe('Omit for a one-off purchase; set to sell this variant as a subscription'),
  stock: z
    .number()
    .int()
    .nonnegative()
    .nullish()
    .describe('Units on hand. Null or omitted means stock is not tracked for this variant'),
  position: z.number().int().optional().describe('Sort order within the product'),
  active: z.boolean().optional().describe('Defaults to true'),
})

export const SaveProductInput = z.object({
  id: z.string().optional().describe('Omit to create a product, provide to update one'),
  slug: z.string().describe('URL-safe identifier, unique across the catalogue'),
  name: z.string().describe('Product name shown to the customer'),
  description: z.string().optional().describe('Long-form description shown on the product page'),
  imageUrl: z.string().optional().describe('Primary product image, also sent to Stripe'),
  requiresShipping: z
    .boolean()
    .optional()
    .describe('True for physical goods, false for digital. Drives address collection at checkout. Defaults to true'),
  active: z.boolean().optional().describe('Defaults to true. Inactive products are hidden from the storefront'),
  metadata: z.record(z.string(), z.string()).optional().describe('Arbitrary key-value pairs stored with the product'),
  variants: z.array(VariantInput).min(1).describe('At least one variant. A simple product has exactly one'),
})

export const SaveProductOutput = z.object({
  id: z.string().describe('The product id'),
  stripeProductId: z.string().nullable().describe('The mirrored Stripe product, null if the push failed'),
  variantIds: z.array(z.string()).describe('Variant ids in the order they were supplied'),
})

/**
 * Create or update a catalogue product and its variants, mirroring both onto
 * Stripe in the same call.
 *
 * The DB write happens first and is authoritative; the Stripe push follows. If
 * the push throws, the row still exists with a null mirror column and checkout
 * fills it in later — see `stripe-catalog.ts`.
 */
export const saveProduct = pikkuFunc({
  description: 'Create or update a product and its variants, writing through to Stripe',
  node: { displayName: 'Save Product', category: 'Catalogue', type: 'action' },
  input: SaveProductInput,
  output: SaveProductOutput,
  tags: ['addon'],
  func: async ({ stripeApi, kysely, logger }, data) => {
    const now = new Date().toISOString()
    const productId = data.id ?? crypto.randomUUID()

    const existing = data.id
      ? await kysely
          .selectFrom('paymentProduct')
          .selectAll()
          .where('id', '=', data.id)
          .executeTakeFirst()
      : undefined

    if (data.id && !existing) {
      throw new BadRequestError(`Unknown product ${data.id}`)
    }

    const fields = {
      slug: data.slug,
      name: data.name,
      description: data.description ?? null,
      imageUrl: data.imageUrl ?? null,
      requiresShipping: (data.requiresShipping ?? true) ? 1 : 0,
      active: (data.active ?? true) ? 1 : 0,
      metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      updatedAt: now,
    }

    if (existing) {
      await kysely.updateTable('paymentProduct').set(fields).where('id', '=', productId).execute()
    } else {
      await kysely
        .insertInto('paymentProduct')
        .values({ id: productId, stripeProductId: null, createdAt: now, ...fields })
        .execute()
    }

    const variantIds: string[] = []
    const changedVariants: string[] = []

    for (const [index, variant] of data.variants.entries()) {
      const variantId = variant.id ?? crypto.randomUUID()
      variantIds.push(variantId)

      const previous = variant.id
        ? await kysely
            .selectFrom('paymentVariant')
            .selectAll()
            .where('id', '=', variant.id)
            .executeTakeFirst()
        : undefined

      const variantFields = {
        productId,
        name: variant.name,
        sku: variant.sku ?? null,
        amountMinor: variant.amountMinor,
        currency: variant.currency,
        recurringInterval: variant.recurringInterval ?? null,
        stock: variant.stock ?? null,
        position: variant.position ?? index,
        active: (variant.active ?? true) ? 1 : 0,
        updatedAt: now,
      }

      if (previous) {
        await kysely
          .updateTable('paymentVariant')
          .set(variantFields)
          .where('id', '=', variantId)
          .execute()
      } else {
        await kysely
          .insertInto('paymentVariant')
          .values({ id: variantId, stripePriceId: null, createdAt: now, ...variantFields })
          .execute()
      }

      // A Stripe Price is immutable, so only a change to what the Price
      // actually encodes is worth replacing it over.
      const priceChanged =
        !previous ||
        !previous.stripePriceId ||
        previous.amountMinor !== variant.amountMinor ||
        previous.currency !== variant.currency ||
        previous.recurringInterval !== (variant.recurringInterval ?? null)

      if (priceChanged) {
        changedVariants.push(variantId)
      }
    }

    let stripeProductId = existing?.stripeProductId ?? null
    try {
      stripeProductId = await pushProduct(stripeApi, {
        stripeProductId,
        name: data.name,
        description: data.description ?? null,
        imageUrl: data.imageUrl ?? null,
        active: fields.active,
      })
      await kysely
        .updateTable('paymentProduct')
        .set({ stripeProductId, updatedAt: now })
        .where('id', '=', productId)
        .execute()

      for (const variantId of changedVariants) {
        await syncVariantPrice(stripeApi, kysely, variantId, stripeProductId)
      }
    } catch (error) {
      logger.warn(
        `product ${productId} saved but the Stripe push failed (${(error as Error).message}) — checkout will retry it`
      )
    }

    return { id: productId, stripeProductId, variantIds }
  },
})
