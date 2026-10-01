import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('NocoDB webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a NocoDB webhook source. NocoDB signs nothing, so the webhook is given an `X-Webhook-Token` header. The event is named after `type` (`records.after.insert`, `records.after.update`, ...), keyed by `id`.
 */
export const nocodbWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a NocoDB webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(new TextDecoder().decode(body))
    return { events: [{ name: data.type, id: data.id, data }] }
  },
})
