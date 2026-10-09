import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { timingSafeStringEqual } from '@pikku/core/hmac'
import { microsoftOutlookWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'microsoft-outlook',
  verify: ({ body }, secret) => {
    const { value = [] } = parseJson(body)
    return value.every(
      (notification: { clientState?: string }) =>
        !!notification.clientState && timingSafeStringEqual(notification.clientState, secret)
    )
  },
  credentialDescription:
    "The clientState given when the Graph subscription was created",
  receive: microsoftOutlookWebhookReceive,
})
