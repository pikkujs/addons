import type { Kysely } from 'kysely'
import { NotFoundError } from '@pikku/core/errors'
import type { PaymentDatabase } from '../../types/application-types.js'
import type { PaymentOwnerRef } from '../payment-owner.service.js'
import type { StripeApi } from '../stripe-api.service.js'

type StripeOwnedResource = {
  id: string
  customer?: string | { id: string } | null
}

/**
 * Reads a Stripe invoice or PaymentIntent and returns it only when it belongs
 * to the caller's Stripe customer on the caller's account.
 *
 * Functions that take a raw Stripe id from the caller would otherwise act on
 * any resource in the account whose id the caller has seen. A resource that
 * is someone else's, or has no customer at all, reads as not found, so an id
 * probe learns nothing about what exists.
 */
export const getOwnedStripeResource = async <T extends StripeOwnedResource>(
  stripeApi: StripeApi,
  kysely: Kysely<PaymentDatabase>,
  owner: PaymentOwnerRef | null,
  path: string
): Promise<T> => {
  if (!owner) {
    throw new NotFoundError('No such Stripe resource')
  }

  const account = owner.stripeAccount ?? null
  const rows = await kysely
    .selectFrom('paymentCustomer')
    .select(['stripeCustomerId'])
    .where('ownerType', '=', owner.type)
    .where('ownerId', '=', owner.id)
    .where('stripeAccount', account ? '=' : 'is', account)
    .execute()
  const customerIds = new Set(rows.map((row) => row.stripeCustomerId))
  // Mirrors ensureCustomer: the owner's own customer is adopted on the default
  // account only.
  if (!account && owner.stripeCustomerId) {
    customerIds.add(owner.stripeCustomerId)
  }

  const resource = await stripeApi.get<T>(path)
  const customer =
    typeof resource.customer === 'string' ? resource.customer : (resource.customer?.id ?? null)
  if (!customer || !customerIds.has(customer)) {
    throw new NotFoundError('No such Stripe resource')
  }
  return resource
}
