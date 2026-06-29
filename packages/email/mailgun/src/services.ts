import { MailgunService } from './mailgun-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const mailgun = new MailgunService(secrets)
  return { mailgun }
})
