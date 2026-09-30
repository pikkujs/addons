import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Airtable webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Airtable webhook source. Verifies `X-Airtable-Content-MAC` over the raw body. Airtable's notification only says a base changed: it becomes a `changed` event, and the consumer lists the webhook's payloads to see what.
 */
export const airtableWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Airtable webhook and read it into trigger events',
  func: async ({ airtableWebhookSecret }, { body, headers }) => {
    const signing = await airtableWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(
      headers['x-airtable-content-mac']?.replace(/^hmac-sha256=/, ''),
      'sha256',
      raw,
      'hex',
      'base64'
    )
    const data = parseJson(raw)
    return { events: [{ name: 'changed', id: `${data.webhook?.id}:${data.timestamp}`, data }] }
  },
})
