import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, SetupIntentSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const SetupIntentCreateInput = z.object({
  customer: z.string().optional().describe('The customer to save the payment method to. Recommended so the card can be reused for off-session charges'),
  paymentMethod: z.string().optional().describe('An existing payment method to set up. Omit for a client-side Elements flow that collects the card in the browser'),
  usage: z.enum(['on_session', 'off_session']).optional().describe('How the saved payment method will be used later. Defaults to off_session (charge without the customer present)'),
  automaticPaymentMethods: z.boolean().optional().describe('Enable Stripe-managed automatic payment methods (recommended for the Payment Element). Ignored when a paymentMethod is supplied'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the SetupIntent'),
})

export const SetupIntentCreateOutput = SetupIntentSchema

export const setupIntentCreate = pikkuSessionlessFunc({
  description: 'Create a SetupIntent to securely save a card for future off-session charges without charging now. Hand the clientSecret to Stripe Elements to collect the card',
  node: { displayName: 'Create Setup Intent', category: 'Setup Intents', type: 'action' },
  input: SetupIntentCreateInput,
  output: SetupIntentCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.setupIntents.create({
      usage: data.usage ?? 'off_session',
      ...(data.customer ? { customer: data.customer } : {}),
      ...(data.paymentMethod ? { payment_method: data.paymentMethod } : {}),
      ...(data.automaticPaymentMethods && !data.paymentMethod
        ? { automatic_payment_methods: { enabled: true } }
        : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    })
    const camel = fromStripeObject(result)
    return SetupIntentCreateOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
