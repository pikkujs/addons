import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { resendWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'resend',
  verify: ({ body, headers }, secret) => {
    const id = headers['svix-id']
    const timestamp = headers['svix-timestamp']
    if (!id || !timestamp || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false
    const signed = `${id}.${timestamp}.${new TextDecoder().decode(body)}`
    return (headers['svix-signature'] ?? '')
      .split(' ')
      .filter((signature) => signature.startsWith('v1,'))
      .some((signature) =>
        verifyHmacSignature(secret, signature.slice(3), 'sha256', signed, 'base64', 'base64')
      )
  },
  credentialDescription:
    "The webhook's signing secret (whsec_...)",
  receive: resendWebhookReceive,
})
