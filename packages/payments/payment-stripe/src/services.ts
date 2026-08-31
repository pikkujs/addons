import { pikkuAddonServices } from '#pikku/addon/setup'
import { StripeApi } from './stripe-api.service.js'
import { StripeSignature } from './stripe-signature.service.js'
import { SessionPaymentOwner } from './payment-owner.service.js'

export const createSingletonServices = pikkuAddonServices(async (_config, existingServices) => {
  const { secrets, variables } = existingServices
  const apiKey = (await secrets.getSecret('STRIPE_SECRET_KEY')).reveal()
  const apiUrl = (await variables.get('STRIPE_API_URL')) ?? undefined
  const apiVersion = (await variables.get('STRIPE_API_VERSION')) ?? null
  const ownerType = (await variables.get('STRIPE_OWNER_TYPE')) === 'organization' ? 'organization' : 'user'

  const signingSecret = await secrets
    .getSecret('STRIPE_WEBHOOK_SECRET')
    .then((secret) => secret?.reveal() ?? null)
    .catch(() => null)

  return {
    ...existingServices,
    stripeApi: new StripeApi(apiKey, apiUrl, apiVersion),
    stripeSignature: new StripeSignature(signingSecret),
    paymentOwner: existingServices.paymentOwner ?? new SessionPaymentOwner(ownerType),
  }
})
