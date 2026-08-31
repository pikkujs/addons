import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'
import { defineVariable } from '@pikku/core/variable'

export const stripeSecretKeySchema = z.string().describe('Stripe secret key (starts with sk_)')

defineSecret({
  name: 'secret_key',
  displayName: 'Stripe Secret Key',
  description: 'Stripe API secret key used for every call this addon makes',
  secretId: 'STRIPE_SECRET_KEY',
  schema: stripeSecretKeySchema,
})

export const stripeWebhookSecretSchema = z
  .string()
  .describe('Stripe webhook signing secret (starts with whsec_)')

defineSecret({
  name: 'webhook_secret',
  displayName: 'Stripe Webhook Signing Secret',
  description:
    'Signing secret for the registered webhook endpoint. Absent, the receiver refuses every caller and payment state is only updated on redirect.',
  secretId: 'STRIPE_WEBHOOK_SECRET',
  schema: stripeWebhookSecretSchema,
  optional: true,
})

export const stripeApiUrlSchema = z.string().describe('Stripe API base URL')

defineVariable({
  name: 'api_url',
  displayName: 'Stripe API URL',
  description: 'Overrides the Stripe API base URL. For local testing against a Stripe mock.',
  variableId: 'STRIPE_API_URL',
  schema: stripeApiUrlSchema,
  optional: true,
})

export const stripeApiVersionSchema = z.string().describe('Stripe API version, e.g. 2025-01-01')

defineVariable({
  name: 'api_version',
  displayName: 'Stripe API Version',
  description:
    'Pins the Stripe API version sent on every request. Unset, Stripe applies the account default, which can differ between a sandbox and the live account that claims it.',
  variableId: 'STRIPE_API_VERSION',
  schema: stripeApiVersionSchema,
  optional: true,
})
