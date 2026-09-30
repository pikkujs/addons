import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('MailerLite webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a MailerLite webhook source. Verifies `Signature` over the raw body. Batched deliveries become one event each; every event is named after its `type` (`subscriber.created`, `campaign.sent`, ...).
 */
export const mailerLiteWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a MailerLite webhook and read it into trigger events',
  func: async ({ mailerLiteWebhookSecret }, { body, headers }) => {
    const signing = await mailerLiteWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(headers['signature'], 'sha256', raw, 'hex')
    const data = parseJson(raw)
    return {
      events: (data.events ?? [data]).map((event: any) => ({
        name: event.type ?? event.event,
        id: event.id,
        data: event,
      })),
    }
  },
})
