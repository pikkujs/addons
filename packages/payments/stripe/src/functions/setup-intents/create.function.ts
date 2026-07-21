import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, SetupIntentSchema } from '../../stripe.types.js'

export const SetupIntentCreateInput = z.object({
  customer: z.string().optional().describe('The customer to save the payment method to. Recommended so the card can be reused for off-session charges'),
  payment_method: z.string().optional().describe('An existing payment method to set up. Omit for a client-side Elements flow that collects the card in the browser'),
  usage: z.enum(['on_session', 'off_session']).optional().describe('How the saved payment method will be used later. Defaults to off_session (charge without the customer present)'),
  automatic_payment_methods: z.boolean().optional().describe('Enable Stripe-managed automatic payment methods (recommended for the Payment Element). Ignored when a payment_method is supplied'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the SetupIntent'),
})

export const SetupIntentCreateOutput = SetupIntentSchema

type Output = z.infer<typeof SetupIntentCreateOutput>

export const setupIntentCreate = pikkuSessionlessFunc({
  description: 'Create a SetupIntent to securely save a card for future off-session charges without charging now. Hand the client_secret to Stripe Elements to collect the card',
  node: { displayName: 'Create Setup Intent', category: 'Setup Intents', type: 'action' },
  input: SetupIntentCreateInput,
  output: SetupIntentCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.setupIntents.create({
      usage: data.usage ?? 'off_session',
      ...(data.customer ? { customer: data.customer } : {}),
      ...(data.payment_method ? { payment_method: data.payment_method } : {}),
      ...(data.automatic_payment_methods && !data.payment_method
        ? { automatic_payment_methods: { enabled: true } }
        : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    }) as unknown as Output
  },
})
