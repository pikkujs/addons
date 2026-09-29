import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Zoom webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Zoom webhook source. Answers Zoom's `endpoint.url_validation` challenge, verifies `x-zm-signature` (`v0=...`) over `v0:timestamp:body`, refuses deliveries more than five minutes old, and names the event after `event` (`meeting.started`, `recording.completed`, ...).
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'zoom',
 *     receive: ref('zoom:zoomWebhookReceive'),
 *   })
 */
export const zoomWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Zoom webhook and read it into trigger events',
  func: async ({ zoomWebhookSecret }, { body, headers }) => {
    const signing = await zoomWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    if (data.event === 'endpoint.url_validation') {
      const plainToken = data.payload.plainToken
      return {
        respond: {
          status: 200,
          body: {
            plainToken,
            encryptedToken: signing.hmac('sha256', plainToken, 'hex'),
          },
        },
      }
    }
    const timestamp = headers['x-zm-request-timestamp']
    if (!timestamp || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
      throw new UnauthorizedError('Stale or unsigned Zoom webhook')
    }
    signing.verifyHmac(
      headers['x-zm-signature']?.replace(/^v0=/, ''),
      'sha256',
      `v0:${timestamp}:${raw}`,
      'hex'
    )
    return { events: [{ name: data.event, id: `${data.event}:${data.event_ts}`, data: data.payload }] }
  },
})
