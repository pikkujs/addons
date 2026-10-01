import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('SendGrid webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a SendGrid webhook source. SendGrid batches events, so each becomes its own event, named after `event` (`delivered`, `open`, `bounce`, ...) and keyed by `sg_event_id`.
 */
export const sendgridWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a SendGrid webhook into trigger events',
  func: async (_services, { body }) => {
    const raw = new TextDecoder().decode(body)
    return {
      events: parseJson(raw).map((event: any) => ({
        name: event.event,
        id: event.sg_event_id,
        data: event,
      })),
    }
  },
})
