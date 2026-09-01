import type { Kysely } from 'kysely'
import type { PaymentDatabase } from '../../types/application-types.js'
import type { StripeApi } from '../stripe-api.service.js'

type StripeId = { id: string }

/**
 * Write-through mirroring of the local catalogue onto Stripe.
 *
 * The local tables are authoritative — nothing here reads Stripe back. Every
 * mutation writes the row and pushes in the same call, so there is no
 * reconciler and no window where the two disagree about intent.
 *
 * Two things make that less trivial than an UPDATE:
 *
 *  - A Stripe Price is immutable. Changing an amount means creating a new Price
 *    and archiving the old one, which `syncVariantPrice` does; orders already
 *    paid keep pointing at the archived price, which is what you want.
 *  - A push can fail after the row is committed, leaving the mirror column
 *    null. That is not a state needing repair by a background job: the next
 *    write retries, and `ensureVariantPrice` fills it in at checkout, which is
 *    the only moment the id is actually required.
 */

export const pushProduct = async (
  stripeApi: StripeApi,
  product: {
    stripeProductId: string | null
    name: string
    description: string | null
    imageUrl: string | null
    active: number
  }
): Promise<string> => {
  // On an update Stripe leaves an omitted field alone, so clearing a
  // description locally has to be sent as an explicit empty value or the old
  // one stays live on the product. On a create there is nothing to clear.
  const update = product.stripeProductId !== null
  const body = {
    name: product.name,
    ...(product.description
      ? { description: product.description }
      : update
        ? { description: '' }
        : {}),
    ...(product.imageUrl ? { images: [product.imageUrl] } : update ? { images: [] } : {}),
    active: product.active === 1,
  }
  const result = product.stripeProductId
    ? await stripeApi.post<StripeId>(`/products/${product.stripeProductId}`, body)
    : await stripeApi.post<StripeId>('/products', body)
  return result.id
}

export const createPrice = async (
  stripeApi: StripeApi,
  variant: {
    stripeProductId: string
    amountMinor: number
    currency: string
    recurringInterval: 'day' | 'week' | 'month' | 'year' | null
  }
): Promise<string> => {
  const price = await stripeApi.post<StripeId>('/prices', {
    product: variant.stripeProductId,
    unit_amount: variant.amountMinor,
    currency: variant.currency,
    ...(variant.recurringInterval ? { recurring: { interval: variant.recurringInterval } } : {}),
  })
  return price.id
}

export const archivePrice = async (stripeApi: StripeApi, priceId: string): Promise<void> => {
  await stripeApi.post(`/prices/${priceId}`, { active: false })
}

/**
 * Brings a variant's mirrored Price in line with its local amount, currency and
 * interval. A Price cannot be edited, so a change to any of those three creates
 * a replacement and archives the previous one. Unchanged variants are left
 * alone rather than churning a new Price on every save.
 */
export const syncVariantPrice = async (
  stripeApi: StripeApi,
  kysely: Kysely<PaymentDatabase>,
  variantId: string,
  stripeProductId: string
): Promise<string | null> => {
  const variant = await kysely
    .selectFrom('paymentVariant')
    .selectAll()
    .where('id', '=', variantId)
    .executeTakeFirst()
  if (!variant) {
    return null
  }

  const priceId = await createPrice(stripeApi, {
    stripeProductId,
    amountMinor: variant.amountMinor,
    currency: variant.currency,
    recurringInterval: variant.recurringInterval,
  })

  await kysely
    .updateTable('paymentVariant')
    .set({ stripePriceId: priceId, updatedAt: new Date().toISOString() })
    .where('id', '=', variantId)
    .execute()

  if (variant.stripePriceId) {
    await archivePrice(stripeApi, variant.stripePriceId)
  }

  return priceId
}

/**
 * Returns the variant's Stripe Price id, creating the Product and Price if an
 * earlier push never landed. Called from checkout so a half-written catalogue
 * still sells rather than failing the customer.
 */
export const ensureVariantPrice = async (
  stripeApi: StripeApi,
  kysely: Kysely<PaymentDatabase>,
  variantId: string
): Promise<string> => {
  const row = await kysely
    .selectFrom('paymentVariant')
    .innerJoin('paymentProduct', 'paymentProduct.id', 'paymentVariant.productId')
    .select([
      'paymentVariant.id as variantId',
      'paymentVariant.stripePriceId as stripePriceId',
      'paymentProduct.id as productId',
      'paymentProduct.stripeProductId as stripeProductId',
      'paymentProduct.name as name',
      'paymentProduct.description as description',
      'paymentProduct.imageUrl as imageUrl',
      'paymentProduct.active as active',
    ])
    .where('paymentVariant.id', '=', variantId)
    .executeTakeFirst()

  if (!row) {
    throw new Error(`Unknown variant ${variantId}`)
  }
  if (row.stripePriceId) {
    return row.stripePriceId
  }

  let stripeProductId = row.stripeProductId
  if (!stripeProductId) {
    stripeProductId = await pushProduct(stripeApi, {
      stripeProductId: null,
      name: row.name,
      description: row.description,
      imageUrl: row.imageUrl,
      active: row.active,
    })
    await kysely
      .updateTable('paymentProduct')
      .set({ stripeProductId, updatedAt: new Date().toISOString() })
      .where('id', '=', row.productId)
      .execute()
  }

  const priceId = await syncVariantPrice(stripeApi, kysely, variantId, stripeProductId)
  if (!priceId) {
    throw new Error(`Could not create a Stripe price for variant ${variantId}`)
  }
  return priceId
}

export const pushShippingRate = async (
  stripeApi: StripeApi,
  rate: {
    name: string
    amountMinor: number
    currency: string
    deliveryMinDays: number | null
    deliveryMaxDays: number | null
  }
): Promise<string> => {
  const result = await stripeApi.post<StripeId>('/shipping_rates', {
    display_name: rate.name,
    type: 'fixed_amount',
    fixed_amount: { amount: rate.amountMinor, currency: rate.currency },
    ...(rate.deliveryMinDays !== null || rate.deliveryMaxDays !== null
      ? {
          delivery_estimate: {
            ...(rate.deliveryMinDays !== null
              ? { minimum: { unit: 'business_day', value: rate.deliveryMinDays } }
              : {}),
            ...(rate.deliveryMaxDays !== null
              ? { maximum: { unit: 'business_day', value: rate.deliveryMaxDays } }
              : {}),
          },
        }
      : {}),
  })
  return result.id
}
