import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { mailgunWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'mailgun',
  verify: ({ body }, secret) => {
    const { signature } = JSON.parse(new TextDecoder().decode(body))
    return verifyHmacSignature(
      secret,
      signature?.signature,
      'sha256',
      `${signature?.timestamp}${signature?.token}`,
      'hex'
    )
  },
  credentialDescription:
    "The account's HTTP webhook signing key",
  receive: mailgunWebhookReceive,
})
