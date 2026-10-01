import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Mailjet webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Mailjet webhook source. Mailjet signs nothing, so the event URL carries a token of your choosing (`/webhooks/mailjet?token=...`). Grouped deliveries become one event each, named after `event` (`sent`, `open`, `bounce`, ...).
 */
export const mailjetWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Mailjet webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson(new TextDecoder().decode(body))
    return {
      events: [data].flat().map((event: any) => ({
        name: event.event,
        id: `${event.MessageID}:${event.event}:${event.time}`,
        data: event,
      })),
    }
  },
})
