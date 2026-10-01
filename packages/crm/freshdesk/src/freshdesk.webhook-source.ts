import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { timingSafeStringEqual } from '@pikku/core/hmac'
import { freshdeskWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'freshdesk',
  verify: ({ query }, secret) => !!query.token && timingSafeStringEqual(query.token, secret),
  credentialDescription:
    "A token of your choosing, added to the automation webhook URL as ?token=",
  receive: freshdeskWebhookReceive,
})
