import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Resend webhook source. Names the event after `type` (`email.delivered`, `email.bounced`, ...), keyed by `svix-id`.
 */
export const resendWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Resend webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const id = headers['svix-id']
    const data = parseJson(body)
    return { events: [{ name: data.type, id, data }] }
  },
})
