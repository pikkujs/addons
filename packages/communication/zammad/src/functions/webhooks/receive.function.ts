import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Zammad webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Zammad webhook source. Verifies `X-Hub-Signature` over the raw body. Zammad webhooks fire from triggers, so the event is named after `X-Zammad-Trigger`, keyed by `X-Zammad-Delivery`.
 */
export const zammadWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Zammad webhook and read it into trigger events',
  func: async ({ zammadWebhookSecret }, { body, headers }) => {
    const signing = await zammadWebhookSecret.load()
    const raw = new TextDecoder().decode(body)
    signing.verifyHmac(
      headers['x-hub-signature']?.replace(/^sha1=/, ''),
      'sha1',
      raw,
      'hex'
    )
    return {
      events: [
        {
          name: headers['x-zammad-trigger'] ?? '',
          id: headers['x-zammad-delivery'],
          data: parseJson(raw),
        },
      ],
    }
  },
})
