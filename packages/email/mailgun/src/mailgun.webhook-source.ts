import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { parseJson } from '#pikku/addon/utils'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { mailgunWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'mailgun',
  verify: ({ body }, secret) => {
    const { signature } = parseJson(body)
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
