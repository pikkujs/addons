import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('MailerLite webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a MailerLite webhook source. Batched deliveries become one event each; every event is named after its `type` (`subscriber.created`, `campaign.sent`, ...).
 */
export const mailerLiteWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a MailerLite webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    return {
      events: (data.events ?? [data]).map((event: any) => ({
        name: event.type ?? event.event,
        id: event.id,
        data: event,
      })),
    }
  },
})
