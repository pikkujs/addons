import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const telegramBaseUrlSchema = z.string().optional().describe('Custom base URL for the Telegram Bot API')

defineVariable({
  name: 'telegram_base_url',
  displayName: 'Telegram Base URL',
  description: 'Custom base URL for the Telegram Bot API (optional)',
  variableId: 'TELEGRAM_BASE_URL',
  schema: telegramBaseUrlSchema,
})
