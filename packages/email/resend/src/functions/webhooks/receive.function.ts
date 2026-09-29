import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Resend webhook body is not valid JSON')
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
 * The `receive` step of a Resend webhook source. Verifies the Svix signature (`svix-id`, `svix-timestamp`, `svix-signature`), refuses deliveries more than five minutes old, and names the event after `type` (`email.delivered`, `email.bounced`, ...), keyed by `svix-id`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'resend',
 *     receive: ref('resend:resendWebhookReceive'),
 *   })
 */
export const resendWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Resend webhook and read it into trigger events',
  func: async ({ resendWebhookSecret }, { body, headers }) => {
    const signing = await resendWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    const id = headers['svix-id']
    const timestamp = headers['svix-timestamp']
    if (!id || !timestamp || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
      throw new UnauthorizedError('Stale or unsigned Resend webhook')
    }
    const signatures = (headers['svix-signature'] ?? '')
      .split(' ')
      .filter((signature) => signature.startsWith('v1,'))
      .map((signature) => signature.slice(3))
    if (
      !anyVerifies(signatures, (signature) =>
        signing.verifyHmac(
          signature,
          'sha256',
          `${id}.${timestamp}.${raw}`,
          'base64',
          'base64'
        )
      )
    ) {
      throw new UnauthorizedError('Invalid Resend webhook signature')
    }
    const data = parseJson(raw)
    return { events: [{ name: data.type, id, data }] }
  },
})
