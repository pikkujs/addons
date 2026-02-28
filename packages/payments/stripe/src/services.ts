import Stripe from 'stripe'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, variables }) => {
  const apiKey = await secrets.getSecretJSON<string>('STRIPE_SECRET_KEY')
  const apiUrl = await variables.get('STRIPE_API_URL') ?? null

  const opts: Stripe.StripeConfig = {}
  if (apiUrl) {
    const url = new URL(apiUrl)
    opts.host = url.hostname
    opts.port = parseInt(url.port)
    opts.protocol = url.protocol.replace(':', '') as 'http' | 'https'
  }

  const stripe = new Stripe(apiKey, opts)

  return { stripe }
})
