import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Linear webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Linear webhook source. Refuses deliveries more than a minute old and names the event after the resource `type` (`Issue`, `Comment`, `Project`, ...), keyed by `Linear-Delivery`. The `action` (`create`, `update`, `remove`) is in the data.
 */
export const linearWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Linear webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    if (Math.abs(Date.now() - Number(data.webhookTimestamp)) > 60_000) {
      throw new UnauthorizedError('Stale Linear webhook')
    }
    return {
      events: [{ name: String(data.type), id: headers['linear-delivery'], data }],
    }
  },
})
