import { GmailService } from './gmail-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { credentials }) => {
  const gmail = new GmailService(credentials)

  return { gmail }
})
