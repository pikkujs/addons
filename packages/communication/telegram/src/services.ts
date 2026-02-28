import { TelegramService } from './telegram-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { variables, secrets }) => {
  const botToken = await secrets.getSecretJSON<string>('TELEGRAM_BOT_TOKEN')
  const baseUrl = await variables.get('TELEGRAM_BASE_URL')
  const telegram = new TelegramService(botToken, baseUrl)

  return { telegram }
})
