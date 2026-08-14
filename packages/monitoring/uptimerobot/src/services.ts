import { UptimerobotService } from './uptimerobot-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('UPTIMEROBOT_CREDENTIALS')).reveal()
  const uptimerobot = new UptimerobotService(creds)

  return { uptimerobot }
})
