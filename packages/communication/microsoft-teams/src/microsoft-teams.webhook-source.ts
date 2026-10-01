import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { timingSafeStringEqual } from '@pikku/core/hmac'
import { microsoftTeamsWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'microsoft-teams',
  verify: ({ body }, secret) => {
    const { value = [] } = JSON.parse(new TextDecoder().decode(body))
    return value.every(
      (notification: { clientState?: string }) =>
        !!notification.clientState && timingSafeStringEqual(notification.clientState, secret)
    )
  },
  credentialDescription:
    "The clientState given when the Graph subscription was created",
  receive: microsoftTeamsWebhookReceive,
})
