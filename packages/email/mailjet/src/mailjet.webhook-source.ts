import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { timingSafeStringEqual } from '@pikku/core/hmac'
import { mailjetWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'mailjet',
  verify: ({ query }, secret) => !!query.token && timingSafeStringEqual(query.token, secret),
  credentialDescription:
    "A token of your choosing, added to the event URL as ?token=",
  receive: mailjetWebhookReceive,
})
