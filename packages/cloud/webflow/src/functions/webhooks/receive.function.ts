import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Webflow webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Webflow webhook source. Names the event after `triggerType` (`form_submission`, `collection_item_created`, ...).
 */
export const webflowWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Webflow webhook into trigger events',
  func: async (_services, { body }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    return { events: [{ name: data.triggerType, data: data.payload ?? data }] }
  },
})
