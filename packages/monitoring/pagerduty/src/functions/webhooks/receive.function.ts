import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('PagerDuty webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a PagerDuty webhook source. Names the event after `event.event_type` (`incident.triggered`, `incident.resolved`, ...), keyed by `event.id`.
 */
export const pagerdutyWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a PagerDuty webhook into trigger events',
  func: async (_services, { body }) => {
    const raw = new TextDecoder().decode(body)
    const { event } = parseJson(raw)
    return { events: [{ name: event.event_type, id: event.id, data: event }] }
  },
})
