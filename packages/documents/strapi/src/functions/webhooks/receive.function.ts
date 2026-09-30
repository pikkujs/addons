import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Strapi webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Strapi webhook source. Strapi signs nothing, so the webhook is given an `Authorization` header, compared here with the configured token. The event is named after `event` (`entry.create`, `entry.publish`, `media.update`, ...).
 */
export const strapiWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Strapi webhook and read it into trigger events',
  func: async ({ strapiWebhookSecret }, { body, headers }) => {
    const signing = await strapiWebhookSecret.load()
    signing.verifyToken(headers['authorization'])
    const data = parseJson(new TextDecoder().decode(body))
    return { events: [{ name: data.event, data }] }
  },
})
