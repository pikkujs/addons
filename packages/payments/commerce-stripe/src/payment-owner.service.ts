import type { CoreUserSession } from '@pikku/core/types'

/**
 * The entity a purchase belongs to, in the app's own terms.
 *
 * `stripeCustomerId` is how an app that already holds a Stripe Customer — the
 * better-auth Stripe plugin keeps one on `user`, `organization` and every
 * `subscription` row — tells the addon to reuse it. Returning it means the
 * addon never posts to `/customers`, so the two halves of an app's Stripe
 * account address one customer rather than two.
 */
export type PaymentOwnerRef = {
  type: string
  id: string
  email?: string | null
  stripeCustomerId?: string | null
}

export interface PaymentOwner {
  resolve(session?: CoreUserSession): Promise<PaymentOwnerRef | null>
}

/**
 * The default: the owner is whoever the session says it is.
 *
 * Which of `userId` and `orgId` is the billing entity is an app-level decision
 * — better-auth models the same choice as its `CustomerType` — so it is a
 * constructor argument, read from `STRIPE_OWNER_TYPE`. An app whose billing
 * entity is neither replaces the service outright.
 */
export class SessionPaymentOwner implements PaymentOwner {
  constructor(private readonly ownerType: 'user' | 'organization' = 'user') {}

  async resolve(session?: CoreUserSession): Promise<PaymentOwnerRef | null> {
    const id = this.ownerType === 'organization' ? session?.orgId : session?.userId
    if (!id) {
      return null
    }
    return { type: this.ownerType, id }
  }
}
