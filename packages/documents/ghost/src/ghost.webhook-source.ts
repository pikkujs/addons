import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { ghostWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'ghost',
  verify: ({ body, headers }, secret) => {
    const fields = Object.fromEntries(
      (headers['x-ghost-signature'] ?? '').split(', ').map((field) => field.split('='))
    )
    return verifyHmacSignature(secret, fields.sha256, 'sha256', `${new TextDecoder().decode(body)}${fields.t}`, 'hex')
  },
  credentialDescription:
    "The webhook's secret",
  receive: ghostWebhookReceive,
})
