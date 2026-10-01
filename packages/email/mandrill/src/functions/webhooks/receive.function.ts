import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Mandrill webhook body is not valid JSON')
  }
}
const parseForm = (raw: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(raw))

/**
 * The `receive` step of a Mandrill webhook source. Mandrill batches events, so each becomes its own event, named after `event` (`send`, `open`, `hard_bounce`, ...). Answers the HEAD request Mandrill checks the URL with when the webhook is added.
 */
export const mandrillWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Mandrill webhook into trigger events',
  func: async ({ variables }, { body, method }) => {
    if (method.toLowerCase() === 'head') {
      return { respond: { status: 200 } }
    }
    const form = parseForm(new TextDecoder().decode(body))
    return {
      events: parseJson(form.mandrill_events ?? '[]').map((event: any) => ({
        name: event.event ?? event.type,
        id: event._id ? `${event._id}:${event.event}:${event.ts}` : undefined,
        data: event,
      })),
    }
  },
})
