import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('PagerDuty webhook body is not valid JSON')
  }
}
const anyVerifies = (signatures: string[], verify: (signature: string) => void) =>
  signatures.some((signature) => {
    try {
      verify(signature)
      return true
    } catch {
      return false
    }
  })

/**
 * The `receive` step of a PagerDuty webhook source. Verifies `X-PagerDuty-Signature` (any of its `v1=` signatures, during a rotation) over the raw body and names the event after `event.event_type` (`incident.triggered`, `incident.resolved`, ...), keyed by `event.id`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'pagerduty',
 *     secret: 'PAGERDUTY_WEBHOOK_SECRET',
 *     receive: ref('pagerduty:pagerdutyWebhookReceive'),
 *   })
 */
export const pagerdutyWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a PagerDuty webhook and read it into trigger events',
  func: async ({ pagerdutyWebhookSecret }, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const signatures = (headers['x-pagerduty-signature'] ?? '')
      .split(',')
      .map((signature) => signature.trim().replace(/^v1=/, ''))
    if (
      !anyVerifies(signatures, (signature) =>
        pagerdutyWebhookSecret.verifyHmac(signature, 'sha256', raw, 'hex')
      )
    ) {
      throw new UnauthorizedError('Invalid PagerDuty webhook signature')
    }
    const { event } = parseJson(raw)
    return { events: [{ name: event.event_type, id: event.id, data: event }] }
  },
})
