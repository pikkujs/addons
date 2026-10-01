import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Trello webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Trello webhook source. Answers the HEAD request Trello checks the callback URL with and names the event after the action's `type` (`createCard`, `updateCard`, ...), keyed by the action's `id`.
 */
export const trelloWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Trello webhook into trigger events',
  func: async ({ variables }, { body, method }) => {
    if (method.toLowerCase() === 'head') {
      return { respond: { status: 200 } }
    }
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    return { events: [{ name: data.action.type, id: data.action.id, data }] }
  },
})
