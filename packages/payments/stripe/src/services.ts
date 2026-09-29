import Stripe from 'stripe'
import { pikkuAddonServices } from '#pikku/addon/setup'
import { StripeWebhookVerifier } from './stripe-webhook-verifier.service.js'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, variables, credentialService }) => {
  const apiKey = (await secrets.getSecret('STRIPE_SECRET_KEY')).reveal()
  const apiUrl = await variables.get('STRIPE_API_URL') ?? null

  const opts: Stripe.StripeConfig = {}
  if (apiUrl) {
    const url = new URL(apiUrl)
    opts.host = url.hostname
    opts.port = parseInt(url.port)
    opts.protocol = url.protocol.replace(':', '') as 'http' | 'https'
  }

  const stripe = new Stripe(apiKey, opts)

  const stripeWebhookVerifier = new StripeWebhookVerifier(
    stripe,
    async () => (await credentialService?.get<string>('stripeWebhookSecret')) ?? null
  )

  return { stripe, stripeWebhookVerifier }
})
