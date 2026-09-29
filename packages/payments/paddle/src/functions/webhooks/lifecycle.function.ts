import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type {
  WebhookCheckResult,
  WebhookLifecycleInput,
  WebhookSetupResult,
  WebhookTeardownInput,
  WebhookTeardownResult,
} from '@pikku/core/trigger'

import type { PaddleService } from '../../paddle-api.service.js'

type NotificationSetting = {
  id: string
  description: string
  destination: string
  active: boolean
  subscribed_events: Array<{ name: string }>
  endpoint_secret_key: string
}

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item) => b.includes(item))

const findSetting = async (paddle: PaddleService, label: string, previous?: Record<string, unknown>) =>
  (await paddle.request<{ data: NotificationSetting[] }>('GET', 'notification-settings')).data.find(
    (setting) => setting.id === previous?.id || setting.description === label
  )

/**
 * The lifecycle steps of a Paddle webhook source: one notification
 * destination per deployment, found by its description (the label). Creating
 * it issues the destination's secret key, which deploy stores.
 *
 * Wire them next to `paddleWebhookReceive`:
 *   check: ref('paddle:paddleWebhookCheck'),
 *   setup: ref('paddle:paddleWebhookSetup'),
 *   teardown: ref('paddle:paddleWebhookTeardown'),
 */
export const paddleWebhookCheck = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookCheckResult>({
  auth: false,
  description: "Check this deployment's Paddle notification destination",
  func: async ({ paddle }, { url, label, events, previous }) => {
    const setting = await findSetting(paddle, label, previous)
    if (!setting) {
      return { status: events.length === 0 ? 'ok' : 'missing' }
    }
    const subscribed = setting.subscribed_events.map((event) => event.name)
    if (setting.destination !== url) {
      return { status: 'drifted', reason: `points at ${setting.destination}` }
    }
    if (!setting.active) {
      return { status: 'drifted', reason: 'is inactive' }
    }
    if (!sameSet(subscribed, events)) {
      return { status: 'drifted', reason: `sends ${subscribed.join(', ')}` }
    }
    return { status: 'ok' }
  },
})

export const paddleWebhookSetup = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookSetupResult>({
  auth: false,
  description: "Create or update this deployment's Paddle notification destination",
  func: async ({ paddle }, { url, label, events, previous }) => {
    const existing = await findSetting(paddle, label, previous)
    if (existing) {
      await paddle.request('PATCH', `notification-settings/${existing.id}`, {
        body: { destination: url, subscribed_events: events, active: true },
      })
      return { status: 'updated', state: { id: existing.id } }
    }
    const { data } = await paddle.request<{ data: NotificationSetting }>('POST', 'notification-settings', {
      body: { description: label, destination: url, subscribed_events: events, type: 'url', api_version: 1 },
    })
    return { status: 'created', state: { id: data.id }, secret: data.endpoint_secret_key }
  },
})

export const paddleWebhookTeardown = pikkuSessionlessFunc<WebhookTeardownInput, WebhookTeardownResult>({
  auth: false,
  description: "Delete this deployment's Paddle notification destination",
  func: async ({ paddle }, { label, previous }) => {
    const setting = await findSetting(paddle, label, previous)
    if (!setting) {
      return { status: 'absent' }
    }
    await paddle.request('DELETE', `notification-settings/${setting.id}`)
    return { status: 'deleted' }
  },
})
