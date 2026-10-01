import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type {
  WebhookCheckResult,
  WebhookLifecycleInput,
  WebhookSetupResult,
  WebhookTeardownInput,
  WebhookTeardownResult,
} from '@pikku/core/trigger'

import type { PagerdutyService } from '../../pagerduty-api.service.js'

type Subscription = {
  id: string
  description: string
  active: boolean
  events: string[]
  delivery_method: { url: string; secret?: string }
}

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item) => b.includes(item))

const findSubscription = async (pagerduty: PagerdutyService, label: string, previous?: Record<string, unknown>) => {
  for (let offset = 0; ; offset += 100) {
    const page = await pagerduty.request<{ webhook_subscriptions: Subscription[]; more: boolean }>(
      'GET',
      '/webhook_subscriptions',
      { qs: { limit: 100, offset } }
    )
    const found = page.webhook_subscriptions.find(
      (subscription) => subscription.id === previous?.id || subscription.description === label
    )
    if (found || !page.more) {
      return found
    }
  }
}

const create = async (pagerduty: PagerdutyService, url: string, label: string, events: string[]) =>
  (
    await pagerduty.request<{ webhook_subscription: Subscription }>('POST', '/webhook_subscriptions', {
      body: {
        webhook_subscription: {
          type: 'webhook_subscription',
          description: label,
          events,
          delivery_method: { type: 'http_delivery_method', url },
          filter: { type: 'account_reference' },
        },
      },
    })
  ).webhook_subscription

/**
 * The lifecycle steps of a PagerDuty webhook source: one account-wide v3
 * subscription per deployment, found by its description (the label). Creating
 * it issues the signing secret, which it stores in the credential store. PagerDuty cannot move a
 * subscription to a new URL, so a changed URL replaces it.
 *
 * Wire them next to `pagerdutyWebhookReceive`:
 *   check: ref('pagerduty:pagerdutyWebhookCheck'),
 *   setup: ref('pagerduty:pagerdutyWebhookSetup'),
 *   teardown: ref('pagerduty:pagerdutyWebhookTeardown'),
 */
export const pagerdutyWebhookCheck = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookCheckResult>({
  auth: false,
  description: "Check this deployment's PagerDuty webhook subscription",
  func: async ({ pagerduty, credentialService }, { url, label, events, previous }) => {
    const subscription = await findSubscription(pagerduty, label, previous)
    if (!subscription) {
      return { status: events.length === 0 ? 'ok' : 'missing' }
    }
    if (!(await credentialService?.get<string>('pagerdutyWebhookSecret'))) {
      return { status: 'drifted', reason: 'has no signing secret stored' }
    }
    if (subscription.delivery_method.url !== url) {
      return { status: 'drifted', reason: `points at ${subscription.delivery_method.url}` }
    }
    if (!subscription.active) {
      return { status: 'drifted', reason: 'is inactive' }
    }
    if (!sameSet(subscription.events, events)) {
      return { status: 'drifted', reason: `sends ${subscription.events.join(', ')}` }
    }
    return { status: 'ok' }
  },
})

export const pagerdutyWebhookSetup = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookSetupResult>({
  auth: false,
  description: "Create or update this deployment's PagerDuty webhook subscription",
  func: async ({ pagerduty, credentialService }, { url, label, events, previous }) => {
    if (!credentialService) {
      throw new Error('Storing the PagerDuty signing secret needs a credentialService')
    }
    const existing = await findSubscription(pagerduty, label, previous)
    if (
      existing &&
      existing.delivery_method.url === url &&
      (await credentialService.get<string>('pagerdutyWebhookSecret'))
    ) {
      await pagerduty.request('PUT', `/webhook_subscriptions/${existing.id}`, {
        body: { webhook_subscription: { events, active: true } },
      })
      return { status: 'updated', state: { id: existing.id } }
    }
    if (existing) {
      await pagerduty.request('DELETE', `/webhook_subscriptions/${existing.id}`)
    }
    const created = await create(pagerduty, url, label, events)
    if (created.delivery_method.secret) {
      await credentialService.set('pagerdutyWebhookSecret', created.delivery_method.secret)
    }
    return { status: existing ? 'updated' : 'created', state: { id: created.id } }
  },
})

export const pagerdutyWebhookTeardown = pikkuSessionlessFunc<WebhookTeardownInput, WebhookTeardownResult>({
  auth: false,
  description: "Delete this deployment's PagerDuty webhook subscription",
  func: async ({ pagerduty, credentialService }, { label, previous }) => {
    const subscription = await findSubscription(pagerduty, label, previous)
    if (!subscription) {
      return { status: 'absent' }
    }
    await pagerduty.request('DELETE', `/webhook_subscriptions/${subscription.id}`)
    await credentialService?.delete('pagerdutyWebhookSecret')
    return { status: 'deleted' }
  },
})
