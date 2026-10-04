import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Clockify webhook source. Compares `Clockify-Signature` with the webhook's token and names the event after `Clockify-Webhook-Event-Type` (`NEW_TIME_ENTRY`, `TIMER_STOPPED`, ...).
 */
export const clockifyWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Clockify webhook into trigger events',
  func: async (_services, { body, headers }) => {
    return {
      events: [
        {
          name: headers['clockify-webhook-event-type'] ?? '',
          data: parseJson(body),
        },
      ],
    }
  },
})
