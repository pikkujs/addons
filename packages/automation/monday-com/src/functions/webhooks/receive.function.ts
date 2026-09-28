import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('monday.com webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a monday.com webhook source. Answers the `challenge` monday.com posts when a webhook is created. monday.com signs nothing for board webhooks, so the URL carries a token of your choosing (`/webhooks/monday-com?token=...`). The event is named after `event.type` (`create_pulse`, `update_column_value`, ...), keyed by `event.triggerUuid`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'monday-com',
 *     secret: 'MONDAY_COM_WEBHOOK_TOKEN',
 *     receive: ref('monday-com:mondayComWebhookReceive'),
 *   })
 */
export const mondayComWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a monday.com webhook and read it into trigger events',
  func: async ({ mondayComWebhookSecret }, { body, query }) => {
    const data = parseJson(new TextDecoder().decode(body))
    if (data.challenge) {
      return { respond: { status: 200, body: { challenge: data.challenge } } }
    }
    mondayComWebhookSecret.verifyToken(query.token)
    return {
      events: [{ name: data.event.type, id: data.event.triggerUuid, data: data.event }],
    }
  },
})
