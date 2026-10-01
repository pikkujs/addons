import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Telegram webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Telegram webhook source. Compares `X-Telegram-Bot-Api-Secret-Token` with the `secret_token` set with `setWebhook`, and names the event after the kind of update (`message`, `callback_query`, `edited_message`, ...), keyed by `update_id`.
 */
export const telegramWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Telegram webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const { update_id, ...update } = parseJson(new TextDecoder().decode(body))
    const name = Object.keys(update)[0] ?? ''
    return { events: [{ name, id: String(update_id), data: update[name] }] }
  },
})
