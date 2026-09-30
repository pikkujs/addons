import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Webflow webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Webflow webhook source. Verifies `X-Webflow-Signature` over `timestamp:body`, refuses deliveries more than five minutes old, and names the event after `triggerType` (`form_submission`, `collection_item_created`, ...).
 */
export const webflowWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Webflow webhook and read it into trigger events',
  func: async ({ webflowWebhookSecret }, { body, headers }) => {
    const signing = await webflowWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    const timestamp = headers['x-webflow-timestamp']
    if (!timestamp || Math.abs(Date.now() - Number(timestamp)) > 300_000) {
      throw new UnauthorizedError('Stale or unsigned Webflow webhook')
    }
    signing.verifyHmac(
      headers['x-webflow-signature'],
      'sha256',
      `${timestamp}:${raw}`,
      'hex'
    )
    const data = parseJson(raw)
    return { events: [{ name: data.triggerType, data: data.payload ?? data }] }
  },
})
