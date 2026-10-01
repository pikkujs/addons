import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import { hmacDigest } from '@pikku/core/hmac'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Zoom webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Zoom webhook source. Answers Zoom's `endpoint.url_validation` challenge and names the event after `event` (`meeting.started`, `recording.completed`, ...).
 */
export const zoomWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Zoom webhook into trigger events',
  func: async ({ credentialService }, { body }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    if (data.event === 'endpoint.url_validation') {
      const secret = await credentialService?.get<string>('zoomWebhookSecret')
      if (typeof secret !== 'string' || !secret) {
        throw new UnauthorizedError('The zoom webhook source has no signing secret')
      }
      const plainToken = data.payload.plainToken
      return {
        respond: {
          status: 200,
          body: {
            plainToken,
            encryptedToken: hmacDigest(secret, 'sha256', plainToken, 'hex'),
          },
        },
      }
    }
    return { events: [{ name: data.event, id: `${data.event}:${data.event_ts}`, data: data.payload }] }
  },
})
