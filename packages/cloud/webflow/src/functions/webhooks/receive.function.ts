import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Webflow webhook source. Names the event after `triggerType` (`form_submission`, `collection_item_created`, ...).
 */
export const webflowWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Webflow webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson(body)
    return { events: [{ name: data.triggerType, data: data.payload ?? data }] }
  },
})
