import { MailgunService } from './mailgun-api.service.js'
import type { MailgunSecrets } from './mailgun.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<MailgunSecrets>('MAILGUN_CREDENTIALS')
  const mailgun = new MailgunService(creds)

  return { mailgun }
})
