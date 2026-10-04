import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type {
  WebhookCheckResult,
  WebhookLifecycleInput,
  WebhookSetupResult,
  WebhookTeardownInput,
  WebhookTeardownResult,
} from '@pikku/core/trigger'

import type { ShopifyService } from '../../shopify-api.service.js'

type ShopifyWebhook = { id: number; topic: string; address: string }

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item) => b.includes(item))

const subscriptions = async (shopify: ShopifyService, url: string) =>
  (
    await shopify.request<{ webhooks: ShopifyWebhook[] }>(
      'GET',
      `/webhooks.json?limit=250&address=${encodeURIComponent(url)}`
    )
  ).webhooks

/**
 * The lifecycle steps of a Shopify webhook source. Shopify subscribes one
 * topic at a time, so the source's route is subscribed once per event
 * (`orders/create`, ...). Shopify signs with the app's client secret, so no
 * secret is issued here.
 *
 * Wire them next to `shopifyWebhookReceive`:
 *   check: ref('shopify:shopifyWebhookCheck'),
 *   setup: ref('shopify:shopifyWebhookSetup'),
 *   teardown: ref('shopify:shopifyWebhookTeardown'),
 */
export const shopifyWebhookCheck = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookCheckResult>({
  auth: false,
  description: "Check this deployment's Shopify webhook subscriptions",
  func: async ({ shopify }, { url, events }) => {
    const topics = (await subscriptions(shopify, url)).map((webhook) => webhook.topic)
    if (topics.length === 0) {
      return { status: events.length === 0 ? 'ok' : 'missing' }
    }
    return sameSet(topics, events)
      ? { status: 'ok' }
      : { status: 'drifted', reason: `subscribed to ${topics.join(', ')}` }
  },
})

export const shopifyWebhookSetup = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookSetupResult>({
  auth: false,
  description: "Subscribe this deployment's Shopify webhook to its events",
  func: async ({ shopify }, { url, events }) => {
    const existing = await subscriptions(shopify, url)
    for (const webhook of existing.filter((webhook) => !events.includes(webhook.topic))) {
      await shopify.request('DELETE', `/webhooks/${webhook.id}.json`)
    }
    for (const topic of events.filter((topic) => !existing.some((webhook) => webhook.topic === topic))) {
      await shopify.request('POST', '/webhooks.json', {
        webhook: { topic, address: url, format: 'json' },
      })
    }
    return { status: existing.length === 0 ? 'created' : 'updated', state: { url } }
  },
})

export const shopifyWebhookTeardown = pikkuSessionlessFunc<WebhookTeardownInput, WebhookTeardownResult>({
  auth: false,
  description: "Remove this deployment's Shopify webhook subscriptions",
  func: async ({ shopify }, { previous }) => {
    const url = typeof previous?.url === 'string' ? previous.url : null
    const existing = url ? await subscriptions(shopify, url) : []
    for (const webhook of existing) {
      await shopify.request('DELETE', `/webhooks/${webhook.id}.json`)
    }
    return { status: existing.length > 0 ? 'deleted' : 'absent' }
  },
})
