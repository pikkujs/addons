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
 * The `receive` step of a Sentry webhook source. Verifies `Sentry-Hook-Signature` over the raw body and names the event `<resource>.<action>` (`issue.created`, `error.created`, `event_alert.triggered`, ...), keyed by `Request-ID`.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'sentry',
 *     secret: 'SENTRY_WEBHOOK_SECRET',
 *     receive: ref('sentry:sentryWebhookReceive'),
 *   })
 */
export const sentryWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Sentry webhook and read it into trigger events',
  func: async ({ sentryWebhookSecret }, { body, headers }) => {
    const raw = new TextDecoder().decode(body)
    sentryWebhookSecret.verifyHmac(headers['sentry-hook-signature'], 'sha256', raw, 'hex')
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
