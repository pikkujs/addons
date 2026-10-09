import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'
import { defineCredential } from '@pikku/core/credential'

export const stripeSecretsSchema = z.string().describe('Stripe Secret Key (starts with sk_)')

export type StripeSecrets = z.infer<typeof stripeSecretsSchema>

defineSecret({
  name: 'secret_key',
  displayName: 'Stripe Secret Key',
  description: 'Stripe API secret key',
  secretId: 'STRIPE_SECRET_KEY',
  schema: stripeSecretsSchema,
})

export const stripeWebhookSecretSchema = z.string().describe('Stripe webhook signing secret (starts with whsec_)')

export type StripeWebhookSecret = z.infer<typeof stripeWebhookSecretSchema>

defineCredential({
  name: 'stripeWebhookSecret',
  displayName: 'Stripe Webhook Signing Secret',
  description: 'Signing secret used to verify inbound Stripe webhook signatures',
  type: 'singleton',
  schema: stripeWebhookSecretSchema,
  optional: true,
})
