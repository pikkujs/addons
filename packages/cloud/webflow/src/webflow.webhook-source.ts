import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { webflowWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'webflow',
  verify: ({ body, headers }, secret) => {
    const timestamp = headers['x-webflow-timestamp']
    if (!timestamp || Math.abs(Date.now() - Number(timestamp)) > 300_000) return false
    return verifyHmacSignature(
      secret,
      headers['x-webflow-signature'],
      'sha256',
      `${timestamp}:${new TextDecoder().decode(body)}`,
      'hex'
    )
  },
  credentialDescription:
    "The site's webhook secret, or the app's client secret for OAuth apps",
  receive: webflowWebhookReceive,
})
