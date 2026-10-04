import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Telegram webhook source. Compares `X-Telegram-Bot-Api-Secret-Token` with the `secret_token` set with `setWebhook`, and names the event after the kind of update (`message`, `callback_query`, `edited_message`, ...), keyed by `update_id`.
 */
export const telegramWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Telegram webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const { update_id, ...update } = parseJson(body)
    const name = Object.keys(update)[0] ?? ''
    return { events: [{ name, id: String(update_id), data: update[name] }] }
  },
})
