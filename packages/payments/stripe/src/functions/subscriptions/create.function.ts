import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, SubscriptionSchema } from '../../stripe.types.js'

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
  trial_period_days: z.number().optional().describe('Number of trial days before the subscription starts billing'),
  default_payment_method: z.string().optional().describe('The saved payment method to bill this subscription against'),
  payment_behavior: z.enum(['default_incomplete', 'allow_incomplete', 'error_if_incomplete', 'pending_if_incomplete']).optional().describe('Use default_incomplete when collecting the first payment client-side: the subscription starts incomplete and returns a PaymentIntent (via latest_invoice) whose client_secret you confirm with Elements'),
  proration_behavior: z.enum(['create_prorations', 'none', 'always_invoice']).optional().describe('How to handle prorations. Defaults to create_prorations'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the subscription'),
  idempotency_key: z.string().optional().describe('Idempotency key so a retried create does not create a duplicate subscription'),
})

export const SubscriptionCreateOutput = SubscriptionSchema

type Output = z.infer<typeof SubscriptionCreateOutput>

export const subscriptionCreate = pikkuSessionlessFunc({
  description: 'Create a subscription for a customer against one or more prices. Use payment_behavior=default_incomplete to collect the first payment client-side',
  node: { displayName: 'Create Subscription', category: 'Subscriptions', type: 'action' },
  input: SubscriptionCreateInput,
  output: SubscriptionCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.subscriptions.create(
      {
        customer: data.customer,
        items: data.items,
        ...(data.trial_period_days !== undefined ? { trial_period_days: data.trial_period_days } : {}),
        ...(data.default_payment_method ? { default_payment_method: data.default_payment_method } : {}),
        ...(data.payment_behavior ? { payment_behavior: data.payment_behavior } : {}),
        ...(data.proration_behavior ? { proration_behavior: data.proration_behavior } : {}),
        ...(data.metadata ? { metadata: data.metadata } : {}),
      },
      data.idempotency_key ? { idempotencyKey: data.idempotency_key } : undefined,
    ) as unknown as Output
  },
})
