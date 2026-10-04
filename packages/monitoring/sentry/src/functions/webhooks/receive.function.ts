import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Sentry webhook source. Names the event `<resource>.<action>` (`issue.created`, `error.created`, `event_alert.triggered`, ...), keyed by `Request-ID`.
 */
export const sentryWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Sentry webhook into trigger events',
  func: async (_services, { body, headers }) => {
    const data = parseJson(body)
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
