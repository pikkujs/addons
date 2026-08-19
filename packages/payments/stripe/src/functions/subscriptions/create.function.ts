import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { MetadataSchema, SubscriptionSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const SubscriptionCreateInput = z.object({
  customer: z.string().describe('The customer to subscribe (cus_...)'),
  items: z
    .array(
      z.object({
        price: z.string().describe('The price id to add to the subscription (price_...)'),
        quantity: z.number().optional().describe('Quantity of this price. Defaults to 1'),
      }),
    )
    .min(1)
    .describe('The list of prices the customer is subscribing to'),
  trialPeriodDays: z.number().optional().describe('Number of trial days before the subscription starts billing'),
  defaultPaymentMethod: z.string().optional().describe('The saved payment method to bill this subscription against'),
  paymentBehavior: z.enum(['default_incomplete', 'allow_incomplete', 'error_if_incomplete', 'pending_if_incomplete']).optional().describe('Use default_incomplete when collecting the first payment client-side: the subscription starts incomplete and returns a PaymentIntent (via latestInvoice) whose clientSecret you confirm with Elements'),
  prorationBehavior: z.enum(['create_prorations', 'none', 'always_invoice']).optional().describe('How to handle prorations. Defaults to create_prorations'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the subscription'),
  idempotencyKey: z.string().optional().describe('Idempotency key so a retried create does not create a duplicate subscription'),
})

export const SubscriptionCreateOutput = SubscriptionSchema

export const subscriptionCreate = pikkuSessionlessFunc({
  description: 'Create a subscription for a customer against one or more prices. Use paymentBehavior=default_incomplete to collect the first payment client-side',
  node: { displayName: 'Create Subscription', category: 'Subscriptions', type: 'action' },
  input: SubscriptionCreateInput,
  output: SubscriptionCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.subscriptions.create(
      {
        customer: data.customer,
        items: data.items,
        ...(data.trialPeriodDays !== undefined ? { trial_period_days: data.trialPeriodDays } : {}),
        ...(data.defaultPaymentMethod ? { default_payment_method: data.defaultPaymentMethod } : {}),
        ...(data.paymentBehavior ? { payment_behavior: data.paymentBehavior } : {}),
        ...(data.prorationBehavior ? { proration_behavior: data.prorationBehavior } : {}),
        ...(data.metadata ? { metadata: data.metadata } : {}),
      },
      data.idempotencyKey ? { idempotencyKey: data.idempotencyKey } : undefined,
    )
    const camel = fromStripeObject(result)
    return SubscriptionCreateOutput.parse({
      ...camel,
      created: epochToIso(result.created),
      currentPeriodStart: epochToIso((result as any).current_period_start),
      currentPeriodEnd: epochToIso((result as any).current_period_end),
    })
  },
})
