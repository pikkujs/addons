import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Paddle webhook body is not valid JSON')
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
 * The `receive` step of a Paddle webhook source. Verifies `Paddle-Signature` (`ts=...;h1=...`, any of several `h1` during a key rotation) over `ts:body`, refuses deliveries more than five minutes old, and names the event after `event_type` (`transaction.completed`, `subscription.updated`, ...), keyed by `event_id`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'paddle',
 *     receive: ref('paddle:paddleWebhookReceive'),
 *   })
 */
export const paddleWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Paddle webhook and read it into trigger events',
  func: async ({ paddleWebhookSecret }, { body, headers }) => {
    const signing = await paddleWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    const fields = (headers['paddle-signature'] ?? '')
      .split(';')
      .map((field) => field.split('='))
    const ts = fields.find(([key]) => key === 'ts')?.[1]
    if (!ts || Math.abs(Date.now() / 1000 - Number(ts)) > 300) {
      throw new UnauthorizedError('Stale or unsigned Paddle webhook')
    }
    const signatures = fields.filter(([key]) => key === 'h1').map(([, value]) => value!)
    if (
      !anyVerifies(signatures, (signature) =>
        signing.verifyHmac(signature, 'sha256', `${ts}:${raw}`, 'hex')
      )
    ) {
      throw new UnauthorizedError('Invalid Paddle webhook signature')
    }
    const data = parseJson(raw)
    return { events: [{ name: data.event_type, id: data.event_id, data }] }
  },
})
