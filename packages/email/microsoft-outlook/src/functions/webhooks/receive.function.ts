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
 */
export const microsoftOutlookWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Read a Microsoft Outlook webhook into trigger events',
  func: async (_services, { body, query }) => {
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
    return {
      events: value.map((notification: any) => ({
        name: notification.changeType,
        id: `${notification.subscriptionId}:${notification.resource}:${notification.changeType}`,
        data: notification,
      })),
    }
  },
})
