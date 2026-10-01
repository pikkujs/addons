import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { twilioWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'twilio',
  verify: async ({ body, headers }, secret, { variables }) => {
    const form = Object.fromEntries(new URLSearchParams(new TextDecoder().decode(body)))
    const url = (await variables.get('TWILIO_WEBHOOK_URL')) ?? ''
    const signed = Object.keys(form)
      .sort()
      .reduce((payload, key) => payload + key + form[key], url)
    return verifyHmacSignature(secret, headers['x-twilio-signature'], 'sha1', signed, 'base64')
  },
  credentialDescription:
    "The account's auth token, which Twilio signs requests with",
  receive: twilioWebhookReceive,
})
