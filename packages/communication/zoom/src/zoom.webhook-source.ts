import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { zoomWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'zoom',
  verify: ({ body, headers }, secret) => {
    const timestamp = headers['x-zm-request-timestamp']
    if (!timestamp || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false
    return verifyHmacSignature(
      secret,
      headers['x-zm-signature']?.replace(/^v0=/, ''),
      'sha256',
      `v0:${timestamp}:${new TextDecoder().decode(body)}`,
      'hex'
    )
  },
  credentialDescription:
    "The app's webhook secret token",
  receive: zoomWebhookReceive,
})
