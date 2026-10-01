import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { paddleWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'paddle',
  verify: ({ body, headers }, secret) => {
    const fields = (headers['paddle-signature'] ?? '').split(';').map((field) => field.split('='))
    const ts = fields.find(([key]) => key === 'ts')?.[1]
    if (!ts || Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false
    const signed = `${ts}:${new TextDecoder().decode(body)}`
    return fields
      .filter(([key]) => key === 'h1')
      .some(([, signature]) => verifyHmacSignature(secret, signature, 'sha256', signed, 'hex'))
  },
  credentialDescription:
    "The notification destination's secret key",
  receive: paddleWebhookReceive,
})
