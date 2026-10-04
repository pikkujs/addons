import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { UnauthorizedError } from '@pikku/core/errors'
import { timingSafeStringEqual } from '@pikku/core/hmac'

/**
 * The `receive` step of an Asana webhook source. Asana makes a handshake while `asanaWebhookCreate` creates the webhook: it is accepted only when its `?h=` matches the nonce that call is holding, and its `X-Hook-Secret` is stored as `asanaWebhookSecret` and echoed. One webhook per app: a second one replaces the secret. Asana batches events, so each becomes its own event named `<resource_type>.<action>` (`task.added`, `task.changed`, ...).
 */
export const asanaWebhookReceive = pikkuWebhookReceive({
  description: 'Read an Asana webhook into trigger events',
  func: async ({ credentialService }, { body, headers, query }, { http }) => {
    const handshake = headers['x-hook-secret']
    if (handshake) {
      const pending = await credentialService?.get<string>('asanaWebhookPending')
      if (!pending || !query.h || !timingSafeStringEqual(query.h, pending)) {
        throw new UnauthorizedError('Unexpected Asana webhook handshake')
      }
      await credentialService!.delete('asanaWebhookPending')
      await credentialService!.set('asanaWebhookSecret', handshake)
      http.response.status(200).header('x-hook-secret', handshake)
      return
    }
    return {
      events: (parseJson(body).events ?? []).map((event: any) => ({
        name: `${event.resource?.resource_type}.${event.action}`,
        data: event,
      })),
    }
  },
})
