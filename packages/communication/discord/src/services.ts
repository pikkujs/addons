import { DiscordService } from './discord-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const botToken = await secrets.getSecret('DISCORD_BOT_TOKEN')
  const discord = new DiscordService(botToken)

  return { discord }
})
