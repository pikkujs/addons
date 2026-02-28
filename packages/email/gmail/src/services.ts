import { GmailService } from './gmail-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const gmail = new GmailService(secrets)

  return { gmail }
})
