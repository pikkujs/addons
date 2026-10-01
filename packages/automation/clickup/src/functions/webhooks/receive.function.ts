import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('ClickUp webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a ClickUp webhook source. Names the event after `event` (`taskCreated`, `taskUpdated`, ...).
 */
export const clickupWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a ClickUp webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    return {
      events: [
        {
          name: data.event,
          id: data.history_items?.[0]?.id,
          data,
        },
      ],
    }
  },
})
