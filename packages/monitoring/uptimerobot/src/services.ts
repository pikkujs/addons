import { UptimerobotService } from './uptimerobot-api.service.js'
import type { UptimerobotSecrets } from './uptimerobot.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<UptimerobotSecrets>('UPTIMEROBOT_CREDENTIALS')
  const uptimerobot = new UptimerobotService(creds)

  return { uptimerobot }
})
