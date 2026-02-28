import { DiscordService } from './discord-api.service.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const botToken = await secrets.getSecretJSON<string>('DISCORD_BOT_TOKEN')
  const discord = new DiscordService(botToken)

  return { discord }
})
