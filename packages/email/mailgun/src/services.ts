import { WebhookSigningSecret } from '@pikku/core/hmac'
import { MailgunService } from './mailgun-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const mailgun = new MailgunService(secrets)
  const mailgunWebhookSecret = new WebhookSigningSecret(
    'Mailgun',
    await secrets
      .getSecret('MAILGUN_WEBHOOK_SIGNING_KEY')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )

  return { mailgun, mailgunWebhookSecret }
})
