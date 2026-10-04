import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { UnauthorizedError } from '@pikku/core/errors'
import { hmacDigest } from '@pikku/core/hmac'

/**
 * The `receive` step of a Zoom webhook source. Answers Zoom's `endpoint.url_validation` challenge and names the event after `event` (`meeting.started`, `recording.completed`, ...).
 */
export const zoomWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Zoom webhook into trigger events',
  func: async ({ credentialService }, { body }, { http }) => {
    const data = parseJson(body)
    if (data.event === 'endpoint.url_validation') {
      const secret = await credentialService?.get<string>('zoomWebhookSecret')
      if (typeof secret !== 'string' || !secret) {
        throw new UnauthorizedError('The zoom webhook source has no signing secret')
      }
      const plainToken = data.payload.plainToken
      http.response.status(200).json({
        plainToken,
        encryptedToken: hmacDigest(secret, 'sha256', plainToken, 'hex'),
      })
      return
    }
    return { events: [{ name: data.event, id: `${data.event}:${data.event_ts}`, data: data.payload }] }
  },
})
