import { WebhookSigningSecret } from '@pikku/core/hmac'
import { SendgridService } from './sendgrid-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const sendgrid = new SendgridService(secrets)
  const sendgridWebhookSecret = new WebhookSigningSecret(
    'SendGrid',
    await secrets
      .getSecret('SENDGRID_WEBHOOK_PUBLIC_KEY')
      .then((secret) => toPublicKeyPem(secret.reveal()))
      .catch(() => null)
  )

  return { sendgrid, sendgridWebhookSecret }
})

const toPublicKeyPem = (key: string) =>
  key.includes('BEGIN PUBLIC KEY')
    ? key
    : `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`
