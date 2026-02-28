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
