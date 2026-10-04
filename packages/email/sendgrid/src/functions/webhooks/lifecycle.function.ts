import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type {
  WebhookCheckResult,
  WebhookLifecycleInput,
  WebhookSetupResult,
  WebhookTeardownInput,
  WebhookTeardownResult,
} from '@pikku/core/trigger'

import type { SendgridService } from '../../sendgrid-api.service.js'

/** SendGrid's settings flag for each event name its webhook delivers. */
const FLAGS: Record<string, string> = {
  processed: 'processed',
  dropped: 'dropped',
  delivered: 'delivered',
  deferred: 'deferred',
  bounce: 'bounce',
  open: 'open',
  click: 'click',
  spamreport: 'spam_report',
  unsubscribe: 'unsubscribe',
  group_unsubscribe: 'group_unsubscribe',
  group_resubscribe: 'group_resubscribe',
}

type EventWebhook = { id: string; url: string; enabled: boolean; friendly_name: string } & Record<string, unknown>

const findWebhook = async (sendgrid: SendgridService, label: string, previous?: Record<string, unknown>) =>
  (
    await sendgrid.request<{ webhooks: EventWebhook[] }>('GET', '/user/webhooks/event/settings/all')
  ).webhooks?.find((webhook) => webhook.id === previous?.id || webhook.friendly_name === label)

const signingKey = async (sendgrid: SendgridService, id: string) =>
  (
    await sendgrid.request<{ public_key?: string }>('GET', `/user/webhooks/event/settings/signed/${id}`)
  ).public_key || undefined

const settings = (url: string, events: string[]) => ({
  enabled: true,
  url,
  ...Object.fromEntries(Object.entries(FLAGS).map(([event, flag]) => [flag, events.includes(event)])),
})

/**
 * The lifecycle steps of a SendGrid webhook source: one Event Webhook per
 * deployment, found by its friendly name (the label), with signature
 * verification switched on. Enabling it issues the verification key, which
 * `setup` stores in the credential store as `sendgridWebhookSecret`.
 *
 * Wire them next to `sendgridWebhookReceive`:
 *   check: ref('sendgrid:sendgridWebhookCheck'),
 *   setup: ref('sendgrid:sendgridWebhookSetup'),
 *   teardown: ref('sendgrid:sendgridWebhookTeardown'),
 */
export const sendgridWebhookCheck = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookCheckResult>({
  auth: false,
  description: "Check this deployment's SendGrid Event Webhook",
  func: async ({ sendgrid, credentialService }, { url, label, events, previous }) => {
    const webhook = await findWebhook(sendgrid, label, previous)
    if (!webhook) {
      return { status: events.length === 0 ? 'ok' : 'missing' }
    }
    const publicKey = await signingKey(sendgrid, webhook.id)
    if (!publicKey) {
      return { status: 'drifted', reason: 'is not signed' }
    }
    if ((await credentialService?.get<string>('sendgridWebhookSecret')) !== publicKey) {
      return { status: 'drifted', reason: 'has a different verification key stored' }
    }
    if (webhook.url !== url) {
      return { status: 'drifted', reason: `points at ${webhook.url}` }
    }
    if (!webhook.enabled) {
      return { status: 'drifted', reason: 'is disabled' }
    }
    const sent = Object.keys(FLAGS).filter((event) => webhook[FLAGS[event]!] === true)
    if (sent.length !== events.length || sent.some((event) => !events.includes(event))) {
      return { status: 'drifted', reason: `sends ${sent.join(', ')}` }
    }
    return { status: 'ok' }
  },
})

export const sendgridWebhookSetup = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookSetupResult>({
  auth: false,
  description: "Create or update this deployment's SendGrid Event Webhook",
  func: async ({ sendgrid, credentialService }, { url, label, events, previous }) => {
    if (!credentialService) {
      throw new Error('Storing the SendGrid signing secret needs a credentialService')
    }
    const existing = await findWebhook(sendgrid, label, previous)
    if (existing) {
      await sendgrid.request('PATCH', `/user/webhooks/event/settings/${existing.id}`, {
        body: settings(url, events),
      })
    }
    const webhook =
      existing ??
      (await sendgrid.request<EventWebhook>('POST', '/user/webhooks/event/settings', {
        body: { ...settings(url, events), friendly_name: label },
      }))
    const publicKey =
      (existing && (await signingKey(sendgrid, existing.id))) ||
      (
        await sendgrid.request<{ public_key: string }>(
          'PATCH',
          `/user/webhooks/event/settings/signed/${webhook.id}`,
          { body: { enabled: true } }
        )
      ).public_key
    await credentialService.set('sendgridWebhookSecret', publicKey)
    return { status: existing ? 'updated' : 'created', state: { id: webhook.id } }
  },
})

export const sendgridWebhookTeardown = pikkuSessionlessFunc<WebhookTeardownInput, WebhookTeardownResult>({
  auth: false,
  description: "Delete this deployment's SendGrid Event Webhook",
  func: async ({ sendgrid, credentialService }, { label, previous }) => {
    const webhook = await findWebhook(sendgrid, label, previous)
    if (!webhook) {
      return { status: 'absent' }
    }
    await sendgrid.request('DELETE', `/user/webhooks/event/settings/${webhook.id}`)
    await credentialService?.delete('sendgridWebhookSecret')
    return { status: 'deleted' }
  },
})
