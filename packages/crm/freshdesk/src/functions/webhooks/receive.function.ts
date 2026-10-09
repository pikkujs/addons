import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Freshdesk webhook source. Freshdesk automation webhooks sign nothing, so the URL carries a token of your choosing (`/webhooks/freshdesk?token=...&event=ticket_created`), and the event it stands for, since the payload is whatever the automation rule sends.
 */
export const freshdeskWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Freshdesk webhook into trigger events',
  func: async (_services, { body, query }) => {
    return {
      events: [{ name: query.event ?? '', data: parseJson(body) }],
    }
  },
})
