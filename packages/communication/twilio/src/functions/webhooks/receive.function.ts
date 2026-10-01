import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseForm = (raw: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(raw))

/**
 * The `receive` step of a Twilio webhook source. A status callback becomes an event named after its status (`MessageStatus`/`CallStatus`: `delivered`, `completed`, ...); an inbound message becomes `message`, keyed by its SID.
 */
export const twilioWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Twilio webhook into trigger events',
  func: async ({ variables }, { body }) => {
    const form = parseForm(new TextDecoder().decode(body))
    const status = form.MessageStatus ?? form.CallStatus
    const sid = form.MessageSid ?? form.CallSid
    return {
      events: [
        {
          name: status ?? 'message',
          id: sid ? `${sid}:${status ?? 'message'}` : undefined,
          data: form,
        },
      ],
    }
  },
})
