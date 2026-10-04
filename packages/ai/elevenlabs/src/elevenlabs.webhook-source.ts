import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { elevenlabsWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'elevenlabs',
  verify: ({ body, headers }, secret) => {
    const fields = Object.fromEntries(
      (headers['elevenlabs-signature'] ?? '').split(',').map((field) => field.split('='))
    )
    if (!fields.t || Math.abs(Date.now() / 1000 - Number(fields.t)) > 1800) return false
    return verifyHmacSignature(secret, fields.v0, 'sha256', `${fields.t}.${new TextDecoder().decode(body)}`, 'hex')
  },
  credentialDescription:
    "The webhook's HMAC secret",
  receive: elevenlabsWebhookReceive,
})
