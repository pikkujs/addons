import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Storyblok webhook source. Names the event `<action>` (`published`, `unpublished`, `deleted`, ...), as Storyblok sends it.
 */
export const storyblokWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Storyblok webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
    return { events: [{ name: data.action, data }] }
  },
})
