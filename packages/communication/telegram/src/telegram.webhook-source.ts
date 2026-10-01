import { wireTriggerWebhookSource } from '#pikku/addon/trigger'
import { telegramWebhookReceive } from './functions/webhooks/receive.function.js'

wireTriggerWebhookSource({
  name: 'telegram',
  verify: {
    token: {
      header: 'x-telegram-bot-api-secret-token',
    },
  },
  credentialDescription:
    "The secret_token given to setWebhook",
  receive: telegramWebhookReceive,
})
