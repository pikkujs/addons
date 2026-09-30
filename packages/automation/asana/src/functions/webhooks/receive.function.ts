import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import { timingSafeStringEqual } from '@pikku/core/hmac'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Asana webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Asana webhook source. Asana makes a handshake while `asanaWebhookCreate` creates the webhook: it is accepted only when its `?h=` matches the nonce that call is holding, and its `X-Hook-Secret` is stored as `asanaWebhookSecret` and echoed. Every delivery after that is checked against `X-Hook-Signature`. One webhook per app: a second one replaces the secret. Asana batches events, so each becomes its own event named `<resource_type>.<action>` (`task.added`, `task.changed`, ...).
 */
export const asanaWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Asana webhook and read it into trigger events',
  func: async ({ asanaWebhookSecret, credentialService }, { body, headers, query }) => {
    const handshake = headers['x-hook-secret']
    if (handshake) {
      const pending = await credentialService?.get<string>('asanaWebhookPending')
      if (!pending || !query.h || !timingSafeStringEqual(query.h, pending)) {
        throw new UnauthorizedError('Unexpected Asana webhook handshake')
      }
      await credentialService!.delete('asanaWebhookPending')
      await credentialService!.set('asanaWebhookSecret', handshake)
      return { respond: { status: 200, headers: { 'x-hook-secret': handshake } } }
    }
    const signing = await asanaWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(headers['x-hook-signature'], 'sha256', raw, 'hex')
    return {
      events: (parseJson(raw).events ?? []).map((event: any) => ({
        name: `${event.resource?.resource_type}.${event.action}`,
        data: event,
      })),
    }
  },
})
