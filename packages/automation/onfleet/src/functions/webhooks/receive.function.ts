import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Onfleet webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Onfleet webhook source. Answers the `?check=` GET Onfleet validates the URL with and names the event after `triggerName` (`taskCompleted`, `taskArrival`, ...).
 */
export const onfleetWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Onfleet webhook into trigger events',
  func: async (_services, { body, headers, method, query }) => {
    if (method.toLowerCase() === 'get') {
      return { respond: { status: 200, body: query.check ?? '' } }
    }
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    return {
      events: [{ name: data.triggerName, id: `${data.taskId}:${data.triggerName}:${data.time}`, data }],
    }
  },
})
