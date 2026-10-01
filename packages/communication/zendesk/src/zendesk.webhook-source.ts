import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { zendeskWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'zendesk',
  verify: ({ body, headers }, secret) =>
    verifyHmacSignature(
      secret,
      headers['x-zendesk-webhook-signature'],
      'sha256',
      `${headers['x-zendesk-webhook-signature-timestamp']}${new TextDecoder().decode(body)}`,
      'base64'
    ),
  credentialDescription:
    "The webhook's signing secret",
  receive: zendeskWebhookReceive,
})
