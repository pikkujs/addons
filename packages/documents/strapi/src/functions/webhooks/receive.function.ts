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
 * The `receive` step of a Strapi webhook source. Strapi signs nothing, so the webhook is given an `Authorization` header. The event is named after `event` (`entry.create`, `entry.publish`, `media.update`, ...).
 */
export const strapiWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Strapi webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(new TextDecoder().decode(body))
    return { events: [{ name: data.event, data }] }
  },
})
