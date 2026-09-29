import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type {
  WebhookCheckResult,
  WebhookLifecycleInput,
  WebhookSetupResult,
  WebhookTeardownInput,
  WebhookTeardownResult,
} from '@pikku/core/trigger'

import type { MandrillService } from '../../mandrill-api.service.js'

type MandrillWebhook = { id: number; url: string; description: string; events: string[]; auth_key: string }

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item) => b.includes(item))

const findWebhook = async (mandrill: MandrillService, label: string, previous?: Record<string, unknown>) =>
  (await mandrill.request<MandrillWebhook[]>('/webhooks', '/list')).find(
    (webhook) => webhook.id === previous?.id || webhook.description === label
  )

/**
 * The lifecycle steps of a Mandrill webhook source: one webhook per
 * deployment, found by its description (the label). Creating it issues the
 * webhook's key, which deploy stores as `MANDRILL_WEBHOOK_KEY`. The receiver
 * signs over the URL, so set the `MANDRILL_WEBHOOK_URL` variable to the same
 * URL. Mandrill checks the URL with a HEAD request before it adds the webhook.
 *
 * Wire them next to `mandrillWebhookReceive`:
 *   check: ref('mandrill:mandrillWebhookCheck'),
 *   setup: ref('mandrill:mandrillWebhookSetup'),
 *   teardown: ref('mandrill:mandrillWebhookTeardown'),
 */
export const mandrillWebhookCheck = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookCheckResult>({
  auth: false,
  description: "Check this deployment's Mandrill webhook",
  func: async ({ mandrill }, { url, label, events, previous }) => {
    const webhook = await findWebhook(mandrill, label, previous)
    if (!webhook) {
      return { status: events.length === 0 ? 'ok' : 'missing' }
    }
    if (webhook.url !== url) {
      return { status: 'drifted', reason: `points at ${webhook.url}` }
    }
    if (!sameSet(webhook.events, events)) {
      return { status: 'drifted', reason: `sends ${webhook.events.join(', ')}` }
    }
    return { status: 'ok' }
  },
})

export const mandrillWebhookSetup = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookSetupResult>({
  auth: false,
  description: "Create or update this deployment's Mandrill webhook",
  func: async ({ mandrill }, { url, label, events, previous }) => {
    const existing = await findWebhook(mandrill, label, previous)
    if (existing) {
      await mandrill.request('/webhooks', '/update', { id: existing.id, url, description: label, events })
      return { status: 'updated', state: { id: existing.id } }
    }
    const created = await mandrill.request<MandrillWebhook>('/webhooks', '/add', { url, description: label, events })
    return { status: 'created', state: { id: created.id }, secret: created.auth_key }
  },
})

export const mandrillWebhookTeardown = pikkuSessionlessFunc<WebhookTeardownInput, WebhookTeardownResult>({
  auth: false,
  description: "Delete this deployment's Mandrill webhook",
  func: async ({ mandrill }, { label, previous }) => {
    const webhook = await findWebhook(mandrill, label, previous)
    if (!webhook) {
      return { status: 'absent' }
    }
    await mandrill.request('/webhooks', '/delete', { id: webhook.id })
    return { status: 'deleted' }
  },
})
