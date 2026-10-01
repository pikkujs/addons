import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { timingSafeStringEqual } from '@pikku/core/hmac'
import { jotformWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'jotform',
  verify: ({ query }, secret) => !!query.token && timingSafeStringEqual(query.token, secret),
  credentialDescription:
    "A token of your choosing, added to the webhook URL as ?token=",
  receive: jotformWebhookReceive,
})
