import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import type { WebhookReceiveResult, WebhookRequest } from '@pikku/core/trigger'

const parseJson = (raw: string): any => {
  try {
    return JSON.parse(raw)
  } catch {
    throw new BadRequestError('Microsoft OneDrive webhook body is not valid JSON')
  }
}

/**
 * The `receive` step of a Microsoft OneDrive webhook source. Answers Microsoft Graph's `validationToken` handshake, compares each notification's `clientState` with the configured secret, and names it after its `changeType` (`created`, `updated`, `deleted`), keyed by subscription and resource. Graph only says what changed: the consumer reads the resource.
 */
export const microsoftOneDriveWebhookReceive = pikkuSessionlessFunc<WebhookRequest, WebhookReceiveResult>({
  auth: false,
  description: 'Verify a Microsoft OneDrive webhook and read it into trigger events',
  func: async ({ microsoftOneDriveWebhookSecret }, { body, query }) => {
    const signing = await microsoftOneDriveWebhookSecret.load()
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
      signing.verifyToken(notification.clientState)
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
