import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Microsoft Outlook webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Microsoft Outlook webhook source. Answers Microsoft Graph's `validationToken` handshake, compares each notification's `clientState` with the configured secret, and names it after its `changeType` (`created`, `updated`, `deleted`), keyed by subscription and resource. Graph only says what changed: the consumer reads the resource.
 *
 * Wire it in the consuming app:
 *   wireTriggerWebhookSource({
 *     name: 'microsoft-outlook',
 *     secret: 'MICROSOFT_OUTLOOK_WEBHOOK_CLIENT_STATE',
 *     receive: ref('microsoft-outlook:microsoftOutlookWebhookReceive'),
 *   })
 */
export const microsoftOutlookWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Microsoft Outlook webhook and read it into trigger events',
  func: async ({ microsoftOutlookWebhookSecret }, { body, query }) => {
    if (query.validationToken) {
      return {
        respond: {
          status: 200,
          body: query.validationToken,
          headers: { 'content-type': 'text/plain' },
        },
      }
    }
    const { value = [] } = parseJson(new TextDecoder().decode(body))
    for (const notification of value) {
      microsoftOutlookWebhookSecret.verifyToken(notification.clientState)
    }
    return {
      events: value.map((notification: any) => ({
        name: notification.changeType,
        id: `${notification.subscriptionId}:${notification.resource}:${notification.changeType}`,
        data: notification,
      })),
    }
  },
})
