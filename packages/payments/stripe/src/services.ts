import Stripe from 'stripe'
import { pikkuAddonServices } from '#pikku'
import { StripeWebhookVerifier } from './stripe-webhook-verifier.service.js'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, variables }) => {
  const apiKey = await secrets.getSecret('STRIPE_SECRET_KEY')
  const apiUrl = await variables.get('STRIPE_API_URL') ?? null

  const opts: Stripe.StripeConfig = {}
  if (apiUrl) {
    const url = new URL(apiUrl)
    opts.host = url.hostname
    opts.port = parseInt(url.port)
    opts.protocol = url.protocol.replace(':', '') as 'http' | 'https'
  }

  const stripe = new Stripe(apiKey, opts)

  // Optional: an app can use the Stripe API without receiving webhooks, so a
  // missing signing secret disables the receiver rather than failing boot.
  const signingSecret = await secrets.getSecret('STRIPE_WEBHOOK_SECRET').catch(() => null)
  const stripeWebhookVerifier = new StripeWebhookVerifier(stripe, signingSecret)

  return { stripe, stripeWebhookVerifier }
})
