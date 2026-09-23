import { pikkuAddonServices } from '#pikku/addon/setup'
import { StripeApi } from './stripe-api.service.js'
import { StripeSignature } from './stripe-signature.service.js'
import { SessionPaymentOwner } from './payment-owner.service.js'
import { BetterAuthPaymentOwner } from './better-auth-owner.service.js'

const parseMap = (value: string | undefined | null): Record<string, string> => {
  if (!value) return {}
  try {
    const parsed = JSON.parse(value)
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, string>) : {}
  } catch {
    return {}
  }
}

/**
 * One account, or several.
 *
 * The single-account path is unchanged: `STRIPE_SECRET_KEY` is the default
 * client and `STRIPE_WEBHOOK_SECRET` its signature. When the host app sets
 * `STRIPE_ACCOUNTS` / `STRIPE_WEBHOOK_SECRETS` (JSON maps of account key →
 * secretId) the addon builds a client and signature per account; the host must
 * grant those secretIds to the addon. `stripeApiFor(account)` falls back to the
 * default for an unknown or unset account, so an app that never configures this
 * behaves exactly as before.
 */
export const createSingletonServices = pikkuAddonServices(async (_config, existingServices) => {
  const { secrets, variables, kysely, logger } = existingServices
  const apiKey = (await secrets.getSecret('STRIPE_SECRET_KEY')).reveal()
  const apiUrl = (await variables.get('STRIPE_API_URL')) ?? undefined
  const apiVersion = (await variables.get('STRIPE_API_VERSION')) ?? null
  const ownerType = (await variables.get('STRIPE_OWNER_TYPE')) === 'organization' ? 'organization' : 'user'
  const accountByCountry = parseMap(await variables.get('STRIPE_ACCOUNT_BY_COUNTRY'))

  const signingSecret = await secrets
    .getSecret('STRIPE_WEBHOOK_SECRET')
    .then((secret) => secret?.reveal() ?? null)
    .catch(() => null)

  const defaultApi = new StripeApi(apiKey, apiUrl, apiVersion)
  const apiByAccount = new Map<string, StripeApi>([['default', defaultApi]])
  for (const [account, secretId] of Object.entries(parseMap(await variables.get('STRIPE_ACCOUNTS')))) {
    const secret = await secrets
      .getSecret(secretId)
      .then((value) => value?.reveal() ?? null)
      .catch(() => null)
    if (secret) apiByAccount.set(account, new StripeApi(secret, apiUrl, apiVersion))
  }
  const stripeApiFor = (account?: string | null): StripeApi =>
    (account ? apiByAccount.get(account) : undefined) ?? defaultApi

  const defaultSignature = new StripeSignature(signingSecret)
  const signatureByAccount = new Map<string, StripeSignature>([['default', defaultSignature]])
  for (const [account, secretId] of Object.entries(
    parseMap(await variables.get('STRIPE_WEBHOOK_SECRETS')),
  )) {
    const secret = await secrets
      .getSecret(secretId)
      .then((value) => value?.reveal() ?? null)
      .catch(() => null)
    signatureByAccount.set(account, new StripeSignature(secret))
  }
  const stripeSignatureFor = (account?: string | null): StripeSignature =>
    (account ? signatureByAccount.get(account) : undefined) ?? defaultSignature

  return {
    ...existingServices,
    stripeApi: defaultApi,
    stripeApiFor,
    stripeSignature: defaultSignature,
    stripeSignatureFor,
    paymentOwner:
      existingServices.paymentOwner ??
      (kysely
        ? new BetterAuthPaymentOwner(kysely as any, ownerType, logger, accountByCountry)
        : new SessionPaymentOwner(ownerType)),
  }
})
