import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Clockify webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Clockify webhook source. Compares `Clockify-Signature` with the webhook's token and names the event after `Clockify-Webhook-Event-Type` (`NEW_TIME_ENTRY`, `TIMER_STOPPED`, ...).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'clockify',
 *     receive: ref('clockify:clockifyWebhookReceive'),
 *   })
 */
export const clockifyWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Clockify webhook and read it into trigger events',
  func: async ({ clockifyWebhookSecret }, { body, headers }) => {
    const signing = await clockifyWebhookSecret.load()
    signing.verifyToken(headers['clockify-signature'])
    return {
      events: [
        {
          name: headers['clockify-webhook-event-type'] ?? '',
          data: parseJson(new TextDecoder().decode(body)),
        },
      ],
    }
  },
})
