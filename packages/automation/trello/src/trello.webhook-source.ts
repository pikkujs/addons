import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { verifyHmacSignature } from '@pikku/core/hmac'
import { trelloWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'trello',
  verify: async ({ body, headers }, secret, { variables }) => {
    const url = (await variables.get('TRELLO_WEBHOOK_URL')) ?? ''
    return verifyHmacSignature(secret, headers['x-trello-webhook'], 'sha1', new TextDecoder().decode(body) + url, 'base64')
  },
  credentialDescription:
    "The app's OAuth secret, which Trello signs webhooks with",
  receive: trelloWebhookReceive,
})
