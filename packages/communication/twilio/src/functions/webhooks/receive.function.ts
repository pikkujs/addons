import { pikkuSessionlessFunc } from '#pikku/addon/function'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseForm = (raw: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(raw))

/**
 * The `receive` step of a Twilio webhook source. Verifies `X-Twilio-Signature` over the configured URL (the `TWILIO_WEBHOOK_URL` variable) and the sorted form parameters. A status callback becomes an event named after its status (`MessageStatus`/`CallStatus`: `delivered`, `completed`, ...); an inbound message becomes `message`, keyed by its SID.
 */
export const twilioWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Twilio webhook and read it into trigger events',
  func: async ({ twilioWebhookSecret, variables }, { body, headers }) => {
    const signing = await twilioWebhookSecret.load()
    const form = parseForm(new TextDecoder().decode(body))
    const url = (await variables.get('TWILIO_WEBHOOK_URL')) ?? ''
    const signed = Object.keys(form)
      .sort()
      .reduce((payload, key) => payload + key + form[key], url)
    signing.verifyHmac(headers['x-twilio-signature'], 'sha1', signed, 'base64')
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
