import { WebhookSigningSecret } from '@pikku/core/hmac'
import { MailgunService } from './mailgun-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const mailgun = new MailgunService(secrets)
  const mailgunWebhookSecret = WebhookSigningSecret.fromCredential(
    'Mailgun',
    credentialService,
    'mailgunWebhookSecret'
  )

  return { mailgun, mailgunWebhookSecret }
})
