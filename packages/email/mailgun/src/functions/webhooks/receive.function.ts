import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Mailgun webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Mailgun webhook source. Names the event the way Mailgun's webhook settings do (`delivered`, `opened`, `clicked`, `permanent_fail`, `temporary_fail`, `unsubscribed`, `complained`), keyed by the event's `id`.
 */
export const mailgunWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Mailgun webhook into trigger events',
  func: async (_services, { body }) => {
    const { 'event-data': event } = parseJson(new TextDecoder().decode(body))
    const name =
      event.event === 'failed'
        ? event.severity === 'permanent'
          ? 'permanent_fail'
          : 'temporary_fail'
        : event.event
    return { events: [{ name, id: event.id, data: event }] }
  },
})
