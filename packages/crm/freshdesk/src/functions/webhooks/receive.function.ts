import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Freshdesk webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Freshdesk webhook source. Freshdesk automation webhooks sign nothing, so the URL carries a token of your choosing (`/webhooks/freshdesk?token=...&event=ticket_created`), and the event it stands for, since the payload is whatever the automation rule sends.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'freshdesk',
 *     secret: 'FRESHDESK_WEBHOOK_TOKEN',
 *     receive: ref('freshdesk:freshdeskWebhookReceive'),
 *   })
 */
export const freshdeskWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Freshdesk webhook and read it into trigger events',
  func: async ({ freshdeskWebhookSecret }, { body, query }) => {
    freshdeskWebhookSecret.verifyToken(query.token)
    return {
      events: [{ name: query.event ?? '', data: parseJson(new TextDecoder().decode(body)) }],
    }
  },
})
