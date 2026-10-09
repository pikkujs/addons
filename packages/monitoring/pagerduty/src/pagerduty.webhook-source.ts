import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { pagerdutyWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'pagerduty',
  verify: ({ body, headers }, secret) => {
    const raw = new TextDecoder().decode(body)
    return (headers['x-pagerduty-signature'] ?? '')
      .split(',')
      .map((signature) => signature.trim().replace(/^v1=/, ''))
      .some((signature) => verifyHmacSignature(secret, signature, 'sha256', raw, 'hex'))
  },
  credentialDescription:
    "The webhook subscription's secret",
  receive: pagerdutyWebhookReceive,
})
