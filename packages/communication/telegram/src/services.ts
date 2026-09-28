import { WebhookSigningSecret } from '@pikku/core/hmac'
import { TelegramService } from './telegram-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { variables, secrets }) => {
  const botToken = (await secrets.getSecret('TELEGRAM_BOT_TOKEN')).reveal()
  const baseUrl = await variables.get('TELEGRAM_BASE_URL')
  const telegram = new TelegramService(botToken, baseUrl)

  const telegramWebhookSecret = new WebhookSigningSecret(
    'Telegram',
    await secrets
      .getSecret('TELEGRAM_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { telegram, telegramWebhookSecret }
})
