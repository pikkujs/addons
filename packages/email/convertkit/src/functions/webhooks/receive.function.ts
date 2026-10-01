import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Kit webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Kit webhook source. Kit signs nothing and leaves the event name out of the payload, so the webhook URL carries both: a token of your choosing and the event it was registered for (`/webhooks/convertkit?token=...&event=subscriber.subscriber_activate`).
 */
export const convertkitWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Kit webhook into trigger events',
  func: async (_services, { body, query }) => {
    return {
      events: [{ name: query.event ?? '', data: parseJson(new TextDecoder().decode(body)) }],
    }
  },
})
