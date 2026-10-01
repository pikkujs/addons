import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyPublicKeySignature } from '@pikku/core/hmac'
import { sendgridWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'sendgrid',
  verify: ({ body, headers }, secret) =>
    verifyPublicKeySignature(
      secret.includes('BEGIN PUBLIC KEY')
        ? secret
        : `-----BEGIN PUBLIC KEY-----\n${secret}\n-----END PUBLIC KEY-----`,
      headers['x-twilio-email-event-webhook-signature'],
      `${headers['x-twilio-email-event-webhook-timestamp']}${new TextDecoder().decode(body)}`
    ),
  credentialDescription:
    "The Event Webhook's verification key, as SendGrid shows it",
  receive: sendgridWebhookReceive,
})
