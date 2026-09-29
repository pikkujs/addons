import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Typeform webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Typeform webhook source. Verifies `Typeform-Signature` over the raw body and names the event after `event_type` (`form_response`), keyed by `event_id`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'typeform',
 *     receive: ref('typeform:typeformWebhookReceive'),
 *   })
 */
export const typeformWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Typeform webhook and read it into trigger events',
  func: async ({ typeformWebhookSecret }, { body, headers }) => {
    const signing = await typeformWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(
      headers['typeform-signature']?.replace(/^sha256=/, ''),
      'sha256',
      raw,
      'base64'
    )
    const data = parseJson(raw)
    return { events: [{ name: data.event_type, id: data.event_id, data }] }
  },
})
