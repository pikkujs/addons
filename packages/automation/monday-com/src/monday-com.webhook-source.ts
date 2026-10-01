import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { timingSafeStringEqual } from '@pikku/core/hmac'
import { mondayComWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'monday-com',
  verify: ({ query }, secret) => !!query.token && timingSafeStringEqual(query.token, secret),
  credentialDescription:
    "A token of your choosing, added to the webhook URL as ?token=",
  receive: mondayComWebhookReceive,
})
