import { MailgunService } from './mailgun-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecret('MAILGUN_CREDENTIALS')
  const mailgun = new MailgunService(creds)

  return { mailgun }
})
