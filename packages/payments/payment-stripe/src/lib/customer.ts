import type { Kysely } from 'kysely'
import type { PaymentDatabase } from '../../types/application-types.js'
import type { PaymentOwnerRef } from '../payment-owner.service.js'
import type { StripeApi } from '../stripe-api.service.js'

/**
 * Finds or creates the Stripe customer for a buyer, and the local row mirroring
 * it.
 *
 * Checkout used to pass `customer_email` and write a fresh local row per
 * purchase, which left a repeat buyer with one row per order and no Stripe
 * customer to hang a subscription, a saved mandate or the billing portal off.
 *
 * Matching is by owner first and email second, because an email is something a
 * buyer can change and reuse and an owner id is not. The owner comes from the
 * app's `paymentOwner` service rather than from a `userId` input, so an app
 * that bills organisations, or that already holds a Stripe Customer of its own,
 * decides who the buyer is. When the owner carries a `stripeCustomerId` the
 * addon adopts it instead of posting to `/customers` — that is what keeps a
 * better-auth subscription and a storefront order on one customer.
 */
export const ensureCustomer = async (
  stripeApi: StripeApi,
  kysely: Kysely<PaymentDatabase>,
  owner: PaymentOwnerRef | null,
  email?: string | null
): Promise<{ id: string; stripeCustomerId: string } | null> => {
  const buyerEmail = email ?? owner?.email ?? null
  if (!owner && !buyerEmail) {
    return null
  }

  const existing = owner
    ? await kysely
        .selectFrom('paymentCustomer')
        .select(['id', 'stripeCustomerId'])
        .where('ownerType', '=', owner.type)
        .where('ownerId', '=', owner.id)
        .executeTakeFirst()
    : undefined

  const found =
    existing ??
    (buyerEmail
      ? await kysely
          .selectFrom('paymentCustomer')
          .select(['id', 'stripeCustomerId'])
          .where('email', '=', buyerEmail)
          .where('ownerId', 'is', null)
          .executeTakeFirst()
      : undefined)

  if (found) {
    // A buyer who signs in after buying as a guest keeps the same Stripe
    // customer; the local row just gains the owner.
    await kysely
      .updateTable('paymentCustomer')
      .set({
        ...(owner ? { ownerType: owner.type, ownerId: owner.id } : {}),
        ...(buyerEmail ? { email: buyerEmail } : {}),
      })
      .where('id', '=', found.id)
      .execute()
    return found
  }

  const stripeCustomerId =
    owner?.stripeCustomerId ??
    (
      await stripeApi.post<{ id: string }>('/customers', {
        ...(buyerEmail ? { email: buyerEmail } : {}),
        ...(owner ? { metadata: { ownerType: owner.type, ownerId: owner.id } } : {}),
      })
    ).id

  const id = crypto.randomUUID()
  await kysely
    .insertInto('paymentCustomer')
    .values({
      id,
      ownerType: owner?.type ?? null,
      ownerId: owner?.id ?? null,
      stripeCustomerId,
      email: buyerEmail,
      createdAt: new Date().toISOString(),
    })
    .execute()

  return { id, stripeCustomerId }
}
