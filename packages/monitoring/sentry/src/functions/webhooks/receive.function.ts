import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Sentry webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Sentry webhook source. Names the event `<resource>.<action>` (`issue.created`, `error.created`, `event_alert.triggered`, ...), keyed by `Request-ID`.
 */
export const sentryWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Sentry webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    const data = parseJson(raw)
    return {
      events: [
        {
          name: `${headers['sentry-hook-resource']}.${data.action}`,
          id: headers['request-id'],
          data,
        },
      ],
    }
  },
})
