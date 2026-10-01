import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Ghost webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Ghost webhook source. Ghost leaves the event out of the payload, so the webhook URL names it (`/webhooks/ghost?event=post.published`).
 */
export const ghostWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Ghost webhook into trigger events',
  func: async (_services, { body, query }) => {
    const raw = new TextDecoder().decode(body)
    return { events: [{ name: query.event ?? '', data: parseJson(raw) }] }
  },
})
