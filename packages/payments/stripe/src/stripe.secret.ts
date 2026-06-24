import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const stripeSecretsSchema = z.string().describe('Stripe Secret Key (starts with sk_)')

export type StripeSecrets = z.infer<typeof stripeSecretsSchema>

wireSecret({
  name: 'secret_key',
  displayName: 'Stripe Secret Key',
  description: 'Stripe API secret key',
  secretId: 'STRIPE_SECRET_KEY',
  schema: stripeSecretsSchema,
})

export const stripeWebhookSecretSchema = z.string().describe('Stripe webhook signing secret (starts with whsec_)')

export type StripeWebhookSecret = z.infer<typeof stripeWebhookSecretSchema>

wireSecret({
  name: 'webhook_secret',
  displayName: 'Stripe Webhook Signing Secret',
  description: 'Signing secret used to verify inbound Stripe webhook signatures',
  secretId: 'STRIPE_WEBHOOK_SECRET',
  schema: stripeWebhookSecretSchema,
})
