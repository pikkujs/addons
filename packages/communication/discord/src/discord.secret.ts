import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const discordSecretsSchema = z.string().describe('Discord Bot Token')

export type DiscordSecrets = z.infer<typeof discordSecretsSchema>

wireSecret({
  name: 'bot_token',
  displayName: 'Discord Bot Token',
  description: 'Discord bot token',
  secretId: 'DISCORD_BOT_TOKEN',
  schema: discordSecretsSchema,
})
