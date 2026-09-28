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
 * The `receive` step of a SendGrid webhook source. Verifies the Event Webhook signature against its verification key. SendGrid batches events, so each becomes its own event, named after `event` (`delivered`, `open`, `bounce`, ...) and keyed by `sg_event_id`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'sendgrid',
 *     secret: 'SENDGRID_WEBHOOK_PUBLIC_KEY',
 *     receive: ref('sendgrid:sendgridWebhookReceive'),
 *   })
 */
export const sendgridWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a SendGrid webhook and read it into trigger events',
  func: async ({ sendgridWebhookSecret }, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    sendgridWebhookSecret.verifyPublicKey(
      headers['x-twilio-email-event-webhook-signature'],
      `${headers['x-twilio-email-event-webhook-timestamp']}${raw}`
    )
    return {
      events: parseJson(raw).map((event: any) => ({
        name: event.event,
        id: event.sg_event_id,
        data: event,
      })),
    }
  },
})
