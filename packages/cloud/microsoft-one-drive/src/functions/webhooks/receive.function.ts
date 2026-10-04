import { pikkuWebhookReceive } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'

/**
 * The `receive` step of a Microsoft OneDrive webhook source. Answers Microsoft Graph's `validationToken` handshake, compares each notification's `clientState` with the configured secret, and names it after its `changeType` (`created`, `updated`, `deleted`), keyed by subscription and resource. Graph only says what changed: the consumer reads the resource.
 */
export const microsoftOneDriveWebhookReceive = pikkuWebhookReceive({
  description: 'Read a Microsoft OneDrive webhook into trigger events',
  func: async (_services, { body, query }, { http }) => {
    if (query.validationToken) {
      http.response
        .status(200)
        .header('content-type', 'text/plain')
        .arrayBuffer(query.validationToken)
      return
    }
    const { value = [] } = parseJson(body)
    return {
      events: value.map((notification: any) => ({
        name: notification.changeType,
        id: `${notification.subscriptionId}:${notification.resource}:${notification.changeType}`,
        data: notification,
      })),
    }
  },
})
