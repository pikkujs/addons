import type Stripe from 'stripe'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'
import type {
  WebhookCheckResult,
  WebhookLifecycleInput,
  WebhookReceiveResult,
  WebhookRequest,
  WebhookSetupResult,
  WebhookTeardownInput,
  WebhookTeardownResult,
} from '@pikku/core/trigger'

/**
 * The webhook source steps for Stripe. `setup` creates the endpoint and hands
 * back its signing secret, so the app stores `STRIPE_WEBHOOK_SECRET` from the
 * deploy rather than copying it from the dashboard.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'stripe',
 *     secret: 'STRIPE_WEBHOOK_SECRET',
 *     receive: ref('stripe:stripeWebhookReceive'),
 *     check: ref('stripe:stripeWebhookCheck'),
 *     setup: ref('stripe:stripeWebhookSetup'),
 *     teardown: ref('stripe:stripeWebhookTeardown'),
 *   })
 */
export const stripeWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Stripe webhook and read it into trigger events',
  func: async ({ stripeWebhookVerifier }, { body, headers }) => {
    const signature = headers['stripe-signature']
    if (!signature || !stripeWebhookVerifier.configured) {
      throw new UnauthorizedError('Invalid Stripe webhook signature')
    }
    let event: { id: string; type: string; data?: unknown }
    try {
      event = await stripeWebhookVerifier.verify(Buffer.from(body), signature)
    } catch {
      throw new UnauthorizedError('Invalid Stripe webhook signature')
    }
    return { events: [{ name: event.type, id: event.id, data: event }] }
  },
})

const LABEL_KEY = 'pikku_label'

const findEndpoint = async (stripe: Stripe, label: string, previous?: Record<string, unknown>) => {
  for await (const endpoint of stripe.webhookEndpoints.list({ limit: 100 })) {
    if (endpoint.id === previous?.id || endpoint.metadata?.[LABEL_KEY] === label) {
      return endpoint
    }
  }
  return undefined
}

const enabledEvents = (events: string[]) =>
  (events.length > 0 ? events : ['*']) as Stripe.WebhookEndpointCreateParams.EnabledEvent[]

const sameEvents = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().every((event, i) => event === [...b].sort()[i])

export const stripeWebhookCheck = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookCheckResult>({
  auth: false,
  description: "Check this deployment's Stripe webhook endpoint",
  func: async ({ stripe }, { url, label, events, previous }) => {
    const endpoint = await findEndpoint(stripe, label, previous)
    if (!endpoint) {
      return { status: 'missing' }
    }
    if (endpoint.url !== url) {
      return { status: 'drifted', reason: `points at ${endpoint.url}` }
    }
    if (endpoint.status !== 'enabled') {
      return { status: 'drifted', reason: 'is disabled' }
    }
    if (!sameEvents(endpoint.enabled_events, enabledEvents(events))) {
      return { status: 'drifted', reason: `sends ${endpoint.enabled_events.join(', ')}` }
    }
    return { status: 'ok' }
  },
})

export const stripeWebhookSetup = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookSetupResult>({
  auth: false,
  description: "Create or update this deployment's Stripe webhook endpoint",
  func: async ({ stripe }, { url, label, events, previous }) => {
    const existing = await findEndpoint(stripe, label, previous)
    if (existing) {
      await stripe.webhookEndpoints.update(existing.id, {
        url,
        enabled_events: enabledEvents(events),
        disabled: false,
      })
      return { status: 'updated', state: { id: existing.id } }
    }
    const created = await stripe.webhookEndpoints.create({
      url,
      enabled_events: enabledEvents(events),
      metadata: { [LABEL_KEY]: label },
    })
    return { status: 'created', state: { id: created.id }, secret: created.secret }
  },
})

export const stripeWebhookTeardown = pikkuSessionlessFunc<WebhookTeardownInput, WebhookTeardownResult>({
  auth: false,
  description: "Delete this deployment's Stripe webhook endpoint",
  func: async ({ stripe }, { label, previous }) => {
    const endpoint = await findEndpoint(stripe, label, previous)
    if (!endpoint) {
      return { status: 'absent' }
    }
    await stripe.webhookEndpoints.del(endpoint.id)
    return { status: 'deleted' }
  },
})
