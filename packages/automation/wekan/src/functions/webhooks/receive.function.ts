import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Wekan webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Wekan webhook source. Wekan signs nothing, so the outgoing webhook URL carries a token of your choosing (`/webhooks/wekan?token=...`). The event is named after the activity's `description` (`act-createCard`, `act-moveCard`, ...).
 */
export const wekanWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Wekan webhook into trigger events',
  func: async (_services, { body }) => {
    const data = parseJson(new TextDecoder().decode(body))
    return { events: [{ name: data.description ?? '', data }] }
  },
})
