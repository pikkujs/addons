import { MailgunService } from './mailgun-api.service.js'
import type { MailgunSecrets } from './mailgun.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<MailgunSecrets>('MAILGUN_CREDENTIALS')
  const mailgun = new MailgunService(creds)

  return { mailgun }
})
