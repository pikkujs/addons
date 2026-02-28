import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const telegramSecretsSchema = z.string().describe('Telegram Bot Token from @BotFather')

export type TelegramSecrets = z.infer<typeof telegramSecretsSchema>

wireSecret({
  name: 'bot_token',
  displayName: 'Telegram Bot Token',
  description: 'Telegram bot token from @BotFather',
  secretId: 'TELEGRAM_BOT_TOKEN',
  schema: telegramSecretsSchema,
})
