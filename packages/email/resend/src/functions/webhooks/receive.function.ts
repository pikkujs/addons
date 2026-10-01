import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Resend webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Resend webhook source. Names the event after `type` (`email.delivered`, `email.bounced`, ...), keyed by `svix-id`.
 */
export const resendWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Resend webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const id = headers['svix-id']
    const data = parseJson(raw)
    return { events: [{ name: data.type, id, data }] }
  },
})
