import { z } from 'zod'

// Common schemas with SDK descriptions

export const AddressSchema = z.object({
  line1: z.string().optional().describe('Address line 1 (Street address/PO Box/Company name)'),
  line2: z.string().optional().describe('Address line 2 (Apartment/Suite/Unit/Building)'),
  city: z.string().optional().describe('City/District/Suburb/Town/Village'),
  state: z.string().optional().describe('State/County/Province/Region'),
  country: z.string().optional().describe('2-letter country code'),
  postalCode: z.string().optional().describe('ZIP or postal code'),
})

export const MetadataSchema = z.record(z.string(), z.string()).describe('Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format')

// Types
export type Address = z.infer<typeof AddressSchema>
export type Metadata = z.infer<typeof MetadataSchema>

// A Stripe list envelope wrapping a single page of `item` objects. Use for any
// `*.list` function so pagination (hasMore + cursor) is exposed consistently.
export const listSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    object: z.literal('list').describe('String representing the object\'s type'),
    data: z.array(item).describe('An array of the requested objects, most recent first'),
    hasMore: z.boolean().describe('True if another page of items exists after this one that can be fetched'),
    url: z.string().describe('The URL where this list can be accessed'),
  })

// A cursor-paginated list request. Spread into a `*.list` input schema.
export const ListParamsSchema = {
  limit: z.number().optional().describe('A limit on the number of objects to be returned. Can range between 1 and 100, default is 10'),
  startingAfter: z.string().optional().describe('A cursor for pagination. An object ID that defines your place in the list; fetch the page after it'),
  endingBefore: z.string().optional().describe('A cursor for pagination. An object ID that defines your place in the list; fetch the page before it'),
}

// PaymentIntent — shared across create/get/confirm/capture/cancel. `clientSecret`
// is what a browser needs to complete the payment with Stripe Elements/Payment Element.
export const PaymentIntentSchema = z.object({
  id: z.string().describe('Unique identifier for the object (pi_...)'),
  object: z.literal('payment_intent').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount intended to be collected by this payment, in the smallest currency unit'),
  amountReceived: z.number().describe('Amount that was collected by this payment, in the smallest currency unit'),
  currency: z.string().describe('Three-letter ISO currency code'),
  status: z.string().describe('Status: requires_payment_method, requires_confirmation, requires_action, processing, requires_capture, canceled or succeeded'),
  customer: z.string().nullable().describe('ID of the customer this payment intent is for'),
  paymentMethod: z.string().nullable().describe('ID of the payment method used in this payment intent'),
  clientSecret: z.string().nullable().describe('The client secret used to complete this payment on the client (Stripe Elements / Payment Element). Treat it like a secret — anyone with it can complete the payment'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('True if the object exists in live mode'),
  metadata: MetadataSchema,
})
export type PaymentIntent = z.infer<typeof PaymentIntentSchema>

// SetupIntent — save a card for future off-session charges without charging now.
export const SetupIntentSchema = z.object({
  id: z.string().describe('Unique identifier for the object (seti_...)'),
  object: z.literal('setup_intent').describe('String representing the object\'s type'),
  status: z.string().describe('Status: requires_payment_method, requires_confirmation, requires_action, processing, canceled or succeeded'),
  clientSecret: z.string().nullable().describe('The client secret used to complete the setup on the client (Stripe Elements). Treat it like a secret'),
  customer: z.string().nullable().describe('ID of the customer this SetupIntent belongs to'),
  paymentMethod: z.string().nullable().describe('ID of the payment method used with this SetupIntent'),
  usage: z.string().describe('How the saved payment method is intended to be used: on_session or off_session'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  metadata: MetadataSchema,
})
export type SetupIntent = z.infer<typeof SetupIntentSchema>

// Refund — reverse a charge or payment intent, in full or in part.
export const RefundSchema = z.object({
  id: z.string().describe('Unique identifier for the object (re_...)'),
  object: z.literal('refund').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount, in the smallest currency unit, that was refunded'),
  currency: z.string().describe('Three-letter ISO currency code'),
  charge: z.string().nullable().describe('ID of the charge that was refunded'),
  paymentIntent: z.string().nullable().describe('ID of the payment intent that was refunded'),
  reason: z.string().nullable().describe('Reason for the refund: duplicate, fraudulent or requested_by_customer'),
  status: z.string().nullable().describe('Status of the refund: pending, requires_action, succeeded, failed or canceled'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  metadata: MetadataSchema,
})
export type Refund = z.infer<typeof RefundSchema>

// Product — a thing you sell. Prices are attached to a product.
export const ProductSchema = z.object({
  id: z.string().describe('Unique identifier for the object (prod_...)'),
  object: z.literal('product').describe('String representing the object\'s type'),
  name: z.string().describe('The product\'s name, meant to be displayable to the customer'),
  description: z.string().nullable().describe('The product\'s description, meant to be displayable to the customer'),
  active: z.boolean().describe('Whether the product is currently available for purchase'),
  defaultPrice: z.string().nullish().describe('The ID of the Price object that is the default price for this product'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  updated: z.string().datetime().describe('Time at which the object was last updated, as an ISO-8601 string'),
  livemode: z.boolean().describe('True if the object exists in live mode'),
  metadata: MetadataSchema,
})
export type Product = z.infer<typeof ProductSchema>

// Price — how much a product costs, one-time or recurring.
export const PriceSchema = z.object({
  id: z.string().describe('Unique identifier for the object (price_...)'),
  object: z.literal('price').describe('String representing the object\'s type'),
  product: z.string().describe('The ID of the product this price is associated with'),
  active: z.boolean().describe('Whether the price can be used for new purchases'),
  currency: z.string().describe('Three-letter ISO currency code'),
  unitAmount: z.number().nullable().describe('The unit amount in the smallest currency unit to be charged'),
  nickname: z.string().nullable().describe('A brief description of the price, hidden from customers'),
  type: z.string().describe('One of one_time or recurring depending on whether the price is for a one-time purchase or a recurring (subscription) purchase'),
  recurring: z
    .object({
      interval: z.string().describe('The frequency at which a subscription is billed: day, week, month or year'),
      intervalCount: z.number().describe('The number of intervals between subscription billings'),
    })
    .nullable()
    .describe('The recurring components of a price such as interval and intervalCount; null for one-time prices'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('True if the object exists in live mode'),
  metadata: MetadataSchema,
})
export type Price = z.infer<typeof PriceSchema>

// Subscription — recurring billing relationship between a customer and one or more prices.
export const SubscriptionSchema = z.object({
  id: z.string().describe('Unique identifier for the object (sub_...)'),
  object: z.literal('subscription').describe('String representing the object\'s type'),
  customer: z.string().describe('ID of the customer who owns the subscription'),
  status: z.string().describe('Status: active, past_due, unpaid, canceled, incomplete, incomplete_expired, trialing or paused'),
  currentPeriodStart: z.string().datetime().nullish().describe('Start of the current invoiced period, as an ISO-8601 string'),
  currentPeriodEnd: z.string().datetime().nullish().describe('End of the current invoiced period, as an ISO-8601 string'),
  cancelAtPeriodEnd: z.boolean().describe('Whether this subscription will cancel at the end of the current billing period'),
  latestInvoice: z.string().nullish().describe('The ID of the most recent invoice this subscription generated. Retrieve it (expanded) to reach the PaymentIntent clientSecret when using payment_behavior=default_incomplete'),
  defaultPaymentMethod: z.string().nullish().describe('ID of the default payment method for the subscription'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('True if the object exists in live mode'),
  metadata: MetadataSchema,
})
export type Subscription = z.infer<typeof SubscriptionSchema>

// Invoice — an itemized statement of what a customer owes, one-off or subscription-driven.
export const InvoiceSchema = z.object({
  id: z.string().describe('Unique identifier for the object (in_...)'),
  object: z.literal('invoice').describe('String representing the object\'s type'),
  customer: z.string().nullable().describe('The ID of the customer who will be billed'),
  status: z.string().nullable().describe('Status: draft, open, paid, uncollectible or void'),
  collectionMethod: z.string().nullable().describe('Either charge_automatically or send_invoice'),
  currency: z.string().describe('Three-letter ISO currency code'),
  amountDue: z.number().describe('Final amount due at this time for this invoice, in the smallest currency unit'),
  amountPaid: z.number().describe('The amount, in the smallest currency unit, that was paid'),
  amountRemaining: z.number().describe('The amount remaining, in the smallest currency unit, that is due'),
  total: z.number().describe('Total after discounts and taxes, in the smallest currency unit'),
  number: z.string().nullable().describe('A unique, identifying string that appears on emails sent to the customer for this invoice'),
  hostedInvoiceUrl: z.string().nullish().describe('The URL for the hosted invoice page, where customers can view and pay an invoice'),
  invoicePdf: z.string().nullish().describe('The link to download the PDF for the invoice'),
  paymentIntent: z.string().nullish().describe('The ID of the PaymentIntent associated with this invoice, if any'),
  subscription: z.string().nullish().describe('The ID of the subscription this invoice was prepared for, if any'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('True if the object exists in live mode'),
  metadata: MetadataSchema,
})
export type Invoice = z.infer<typeof InvoiceSchema>

// Connected account (Stripe Connect) — a marketplace's seller/vendor sub-account.
export const ConnectedAccountSchema = z.object({
  id: z.string().describe('Unique identifier for the object (acct_...)'),
  object: z.literal('account').describe('String representing the object\'s type'),
  type: z.string().nullish().describe('The Stripe account type: standard, express or custom'),
  email: z.string().nullable().describe('The primary user\'s email address'),
  country: z.string().nullish().describe('The account\'s country'),
  chargesEnabled: z.boolean().describe('Whether the account can create live charges'),
  payoutsEnabled: z.boolean().describe('Whether Stripe can send payouts to this account'),
  detailsSubmitted: z.boolean().describe('Whether the account has completed onboarding and submitted all required information'),
  created: z.string().datetime().nullish().describe('Time at which the object was created, as an ISO-8601 string'),
  metadata: MetadataSchema,
})
export type ConnectedAccount = z.infer<typeof ConnectedAccountSchema>

// Transfer — move funds from your platform balance to a connected account.
export const TransferSchema = z.object({
  id: z.string().describe('Unique identifier for the object (tr_...)'),
  object: z.literal('transfer').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount, in the smallest currency unit, transferred'),
  currency: z.string().describe('Three-letter ISO currency code'),
  destination: z.string().nullable().describe('ID of the connected account that received the transfer'),
  transferGroup: z.string().nullable().describe('A string that identifies this transaction as part of a group'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('True if the object exists in live mode'),
  metadata: MetadataSchema,
})
export type Transfer = z.infer<typeof TransferSchema>

// Payout — send funds from a Stripe balance to a bank account or debit card.
export const PayoutSchema = z.object({
  id: z.string().describe('Unique identifier for the object (po_...)'),
  object: z.literal('payout').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount, in the smallest currency unit, to be transferred to the bank account or debit card'),
  currency: z.string().describe('Three-letter ISO currency code'),
  status: z.string().describe('Current status: paid, pending, in_transit, canceled or failed'),
  method: z.string().describe('The method used to send this payout: standard or instant'),
  arrivalDate: z.string().datetime().describe('Date the payout is expected to arrive in the bank, as an ISO-8601 string'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('True if the object exists in live mode'),
  metadata: MetadataSchema,
})
export type Payout = z.infer<typeof PayoutSchema>
