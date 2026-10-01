import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Zammad webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Zammad webhook source. Zammad webhooks fire from triggers, so the event is named after `X-Zammad-Trigger`, keyed by `X-Zammad-Delivery`.
 */
export const zammadWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Zammad webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    return {
      events: [
        {
          name: headers['x-zammad-trigger'] ?? '',
          id: headers['x-zammad-delivery'],
          data: parseJson(raw),
        },
      ],
    }
  },
})
