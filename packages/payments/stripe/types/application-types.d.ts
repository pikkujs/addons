import type {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
} from '@pikku/core'
import type Stripe from 'stripe'
import type { StripeWebhookVerifier } from '../src/stripe-webhook-verifier.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {}

export interface SingletonServices extends CoreSingletonServices<Config> {
  stripe: Stripe
  /** Holds STRIPE_WEBHOOK_SECRET so the handler never reads it — see the service. */
  stripeWebhookVerifier: StripeWebhookVerifier
}

export interface Services extends CoreServices<SingletonServices> {}
