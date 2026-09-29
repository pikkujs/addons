import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type {
  WebhookCheckResult,
  WebhookLifecycleInput,
  WebhookSetupResult,
  WebhookTeardownInput,
  WebhookTeardownResult,
} from '@pikku/core/trigger'

type WebhookInfo = { url: string; allowed_updates?: string[] }

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item) => b.includes(item))

/**
 * The lifecycle steps of a Telegram webhook source. A bot has exactly one
 * webhook, so `setup` points it at this deployment, replacing whatever it
 * pointed at, with a fresh `secret_token` for deploy to store as
 * `TELEGRAM_WEBHOOK_SECRET`. Events are the update kinds (`message`,
 * `callback_query`, ...); none means Telegram's default set.
 *
 * Wire them next to `telegramWebhookReceive`:
 *   check: ref('telegram:telegramWebhookCheck'),
 *   setup: ref('telegram:telegramWebhookSetup'),
 *   teardown: ref('telegram:telegramWebhookTeardown'),
 */
export const telegramWebhookCheck = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookCheckResult>({
  auth: false,
  description: "Check the bot's Telegram webhook",
  func: async ({ telegram }, { url, events }) => {
    const info = await telegram.request<WebhookInfo>('getWebhookInfo')
    if (!info.url) {
      return { status: 'missing' }
    }
    if (info.url !== url) {
      return { status: 'drifted', reason: `points at ${info.url}` }
    }
    if (events.length > 0 && !sameSet(info.allowed_updates ?? [], events)) {
      return { status: 'drifted', reason: `allows ${(info.allowed_updates ?? []).join(', ') || 'the default updates'}` }
    }
    return { status: 'ok' }
  },
})

export const telegramWebhookSetup = pikkuSessionlessFunc<WebhookLifecycleInput, WebhookSetupResult>({
  auth: false,
  description: "Point the bot's Telegram webhook at this deployment",
  func: async ({ telegram }, { url, events }) => {
    const previous = await telegram.request<WebhookInfo>('getWebhookInfo')
    const secret = crypto.randomUUID().replaceAll('-', '')
    await telegram.request('setWebhook', {
      body: { url, secret_token: secret, allowed_updates: events },
    })
    return { status: previous.url ? 'updated' : 'created', state: { url }, secret }
  },
})

export const telegramWebhookTeardown = pikkuSessionlessFunc<WebhookTeardownInput, WebhookTeardownResult>({
  auth: false,
  description: "Remove the bot's Telegram webhook if it points at this deployment",
  func: async ({ telegram }, { previous }) => {
    const info = await telegram.request<WebhookInfo>('getWebhookInfo')
    if (!info.url || info.url !== previous?.url) {
      return { status: 'absent' }
    }
    await telegram.request('deleteWebhook')
    return { status: 'deleted' }
  },
})
