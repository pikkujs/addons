import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { timingSafeStringEqual } from '@pikku/core/hmac'
import { convertkitWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'convertkit',
  verify: ({ query }, secret) => !!query.token && timingSafeStringEqual(query.token, secret),
  credentialDescription:
    "A token of your choosing, added to the webhook URL as ?token=",
  receive: convertkitWebhookReceive,
})
