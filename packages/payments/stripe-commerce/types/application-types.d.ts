import type { CoreConfig, CoreServices, CoreSingletonServices, CoreUserSession } from '@pikku/core/types'
import type { Kysely } from 'kysely'
import type { StripeApi } from '../src/stripe-api.service.js'
import type { StripeSignature } from '../src/stripe-signature.service.js'
import type { PaymentOwner } from '../src/payment-owner.service.js'

/**
 * The tables this addon ships, declared in `db/sqlite` and `db/postgres` and
 * published to consumers by `pikku db export`.
 *
 * Both dialect files are byte-identical: every column stays inside the subset
 * SQLite and Postgres share, so there is one schema rather than two that drift.
 * Money is an integer in the currency's minor unit — never a float, and never
 * assumed to be 1/100, since JPY and KRW are zero-decimal and KWD is three.
 *
 * Booleans are INTEGER 0/1 for the same reason: SQLite has no boolean type, so
 * a shared column definition cannot use one.
 *
 * The catalogue is local and authoritative. `stripeProductId`, `stripePriceId`
 * and `stripeShippingRateId` are write-through mirrors — the same function that
 * writes the row pushes to Stripe, and a null means the push has not landed yet
 * rather than that something needs reconciling.
 */
export interface PaymentDatabase {
  paymentCustomer: {
    id: string
    /**
     * Who the Stripe Customer belongs to, in the app's own terms — 'user' or
     * 'organization' for a better-auth app, anything the app's `paymentOwner`
     * service returns otherwise. Both columns are null for a guest.
     */
    ownerType: string | null
    ownerId: string | null
    stripeCustomerId: string
    email: string | null
    createdAt: string
  }
  paymentProduct: {
    id: string
    slug: string
    name: string
    description: string | null
    imageUrl: string | null
    requiresShipping: number
    active: number
    stripeProductId: string | null
    metadata: string | null
    createdAt: string
    updatedAt: string
  }
  paymentVariant: {
    id: string
    productId: string
    name: string
    sku: string | null
    amountMinor: number
    currency: string
    /** Null for a one-off purchase; set makes the variant a subscription. */
    recurringInterval: 'day' | 'week' | 'month' | 'year' | null
    /** Null means stock is not tracked for this variant. */
    stock: number | null
    position: number
    active: number
    stripePriceId: string | null
    createdAt: string
    updatedAt: string
  }
  paymentShippingRate: {
    id: string
    name: string
    amountMinor: number
    currency: string
    deliveryMinDays: number | null
    deliveryMaxDays: number | null
    position: number
    active: number
    stripeShippingRateId: string | null
    createdAt: string
    updatedAt: string
  }
  paymentCart: {
    id: string
    token: string
    ownerType: string | null
    ownerId: string | null
    email: string | null
    status: 'open' | 'converted' | 'abandoned'
    createdAt: string
    updatedAt: string
  }
  paymentCartItem: {
    id: string
    cartId: string
    variantId: string
    quantity: number
    createdAt: string
    updatedAt: string
  }
  paymentOrder: {
    id: string
    customerId: string | null
    cartId: string | null
    email: string | null
    stripeCheckoutSessionId: string | null
    stripePaymentIntentId: string | null
    amountMinor: number
    amountRefundedMinor: number
    currency: string
    /**
     * Two states sit between checkout and money:
     *
     *  - 'authorized' — a manual-capture session the customer completed. The
     *    funds are held on their card and `captureOrder` releases them.
     *  - 'processing' — a delayed-notification method (SEPA, ACH, bank
     *    transfer) whose funds have not settled. Stripe's fulfilment guide is
     *    explicit that an order in that state must not be fulfilled.
     *
     * Both arrive as `payment_status: 'unpaid'`; `captureMethod` is what tells
     * them apart, which is why it is recorded when the session is created.
     */
    status: 'pending' | 'authorized' | 'processing' | 'paid' | 'failed' | 'expired' | 'refunded'
    captureMethod: 'automatic' | 'manual'
    /** What was actually taken, when a manual capture took less than authorized. */
    amountCapturedMinor: number | null
    fulfillmentStatus: 'not_required' | 'unfulfilled' | 'fulfilled'
    disputeStatus: 'open' | 'won' | 'lost' | null
    shippingName: string | null
    shippingLine1: string | null
    shippingLine2: string | null
    shippingCity: string | null
    shippingState: string | null
    shippingPostalCode: string | null
    shippingCountry: string | null
    trackingNumber: string | null
    trackingUrl: string | null
    shippedAt: string | null
    metadata: string | null
    createdAt: string
    updatedAt: string
  }
  paymentOrderItem: {
    id: string
    orderId: string
    variantId: string | null
    /** Snapshot, so an order still reads correctly after the product is renamed. */
    name: string
    sku: string | null
    quantity: number
    unitAmountMinor: number
    currency: string
    requiresShipping: number
  }
  paymentSubscription: {
    id: string
    customerId: string | null
    stripeSubscriptionId: string
    stripePriceId: string | null
    /**
     * The catalogue variant this subscription sells, when it is one of ours.
     *
     * Stripe delivers `customer.subscription.*` to every registered endpoint,
     * so this table sees the whole account — including the plan subscriptions
     * better-auth created through its own checkout. A set `variantId` is what
     * separates a storefront sale, a recurring product with a price in this
     * catalogue, from a plan subscription that only better-auth's table can
     * say anything useful about.
     */
    variantId: string | null
    status: string
    currentPeriodEnd: string | null
    cancelAtPeriodEnd: number
    createdAt: string
    updatedAt: string
  }
  /**
   * One row per Stripe refund, keyed by Stripe's own refund id. The order's
   * running total is only moved when a row is actually inserted here, which is
   * what stops a retried or concurrent refund being counted twice.
   */
  paymentRefund: {
    id: string
    orderId: string
    amountMinor: number
    reason: string | null
    createdAt: string
  }
  paymentWebhookEvent: {
    id: string
    type: string
    status: string
    receivedAt: string
  }
}

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  stripeApi: StripeApi
  /** Holds STRIPE_WEBHOOK_SECRET so the receiver never reads it — see the service. */
  stripeSignature: StripeSignature
  /**
   * Resolves the session into the entity a purchase belongs to. The addon falls
   * back to a session-derived one, so a parent app only supplies this when its
   * billing entity is not the session's user or org, or when a Stripe Customer
   * already exists elsewhere — a better-auth `stripeCustomerId`, say — and the
   * addon must reuse it rather than mint a second.
   */
  paymentOwner: PaymentOwner
  kysely: Kysely<PaymentDatabase>
}

export interface Services extends CoreServices<SingletonServices> {}
