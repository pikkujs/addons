import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Mailgun webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Mailgun webhook source. Verifies the payload's `signature` (HMAC of `timestamp + token`) and names the event the way Mailgun's webhook settings do (`delivered`, `opened`, `clicked`, `permanent_fail`, `temporary_fail`, `unsubscribed`, `complained`), keyed by the event's `id`.
 */
export const mailgunWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Mailgun webhook and read it into trigger events',
  func: async ({ mailgunWebhookSecret }, { body }) => {
    const signing = await mailgunWebhookSecret.load()
    const { signature, 'event-data': event } = parseJson(new TextDecoder().decode(body))
    signing.verifyHmac(
      signature?.signature,
      'sha256',
      `${signature?.timestamp}${signature?.token}`,
      'hex'
    )
    const name =
      event.event === 'failed'
        ? event.severity === 'permanent'
          ? 'permanent_fail'
          : 'temporary_fail'
        : event.event
    return { events: [{ name, id: event.id, data: event }] }
  },
})
