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

export const stripeAccountsSchema = z
  .string()
  .describe('JSON object mapping an account key to the secretId holding its Stripe secret key')

/**
 * Multi-account option. `{"cc-eu":"STRIPE_CC_EU_SECRET_KEY", ...}` — each entry
 * names a secretId the host app declares and grants to this addon. Unset, the
 * addon serves the single `STRIPE_SECRET_KEY` account exactly as before.
 */
defineVariable({
  name: 'accounts',
  displayName: 'Stripe Accounts',
  description:
    'JSON map of account key → secretId of that account’s Stripe secret key (e.g. {"cc-eu":"STRIPE_CC_EU_SECRET_KEY"}). Unset means one account.',
  variableId: 'STRIPE_ACCOUNTS',
  schema: stripeAccountsSchema,
  optional: true,
})

export const stripeWebhookSecretsSchema = z
  .string()
  .describe('JSON object mapping an account key to the secretId holding its webhook signing secret')

/** The per-account counterpart of `STRIPE_ACCOUNTS`, for signature verification. */
defineVariable({
  name: 'webhook_secrets',
  displayName: 'Stripe Webhook Secrets',
  description:
    'JSON map of account key → secretId of that account’s webhook signing secret. Unset means one account.',
  variableId: 'STRIPE_WEBHOOK_SECRETS',
  schema: stripeWebhookSecretsSchema,
  optional: true,
})

export const stripeAccountByCountrySchema = z
  .string()
  .describe('JSON object mapping a two-letter country code to an account key')

/**
 * How a jurisdiction selects its account. `{"de":"cc-eu","gb":"cc-gb", ...}` —
 * the addon's better-auth owner reads the organization's `country` and resolves
 * the matching account key. Unset means the default account.
 */
defineVariable({
  name: 'account_by_country',
  displayName: 'Stripe Account by Country',
  description:
    'JSON map of country code → account key (e.g. {"de":"cc-eu","gb":"cc-gb"}), used to pick the account for an organization by its country.',
  variableId: 'STRIPE_ACCOUNT_BY_COUNTRY',
  schema: stripeAccountByCountrySchema,
  optional: true,
})
