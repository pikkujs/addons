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
 * The `receive` step of a Mailjet webhook source. Mailjet signs nothing, so the event URL carries a token of your choosing (`/webhooks/mailjet?token=...`), compared here. Grouped deliveries become one event each, named after `event` (`sent`, `open`, `bounce`, ...).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'mailjet',
 *     secret: 'MAILJET_WEBHOOK_TOKEN',
 *     receive: ref('mailjet:mailjetWebhookReceive'),
 *   })
 */
export const mailjetWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Mailjet webhook and read it into trigger events',
  func: async ({ mailjetWebhookSecret }, { body, query }) => {
    mailjetWebhookSecret.verifyToken(query.token)
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
