import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Wise webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Wise webhook source. Names the event after `event_type` (`transfers#state-change`, `balances#credit`, ...), keyed by `X-Delivery-Id`.
 */
export const wiseWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Wise webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    return {
      events: [{ name: String(data.event_type), id: headers['x-delivery-id'], data }],
    }
  },
})
