import { WebhookSigningSecret } from '@pikku/core/hmac'
import { TelegramService } from './telegram-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { variables, secrets, credentialService }) => {
  const botToken = (await secrets.getSecret('TELEGRAM_BOT_TOKEN')).reveal()
  const baseUrl = await variables.get('TELEGRAM_BASE_URL')
  const telegram = new TelegramService(botToken, baseUrl)

  const telegramWebhookSecret = WebhookSigningSecret.fromCredential(
    'Telegram',
    credentialService,
    'telegramWebhookSecret'
  )


  return { telegram, telegramWebhookSecret }
})
