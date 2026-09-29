import { WebhookSigningSecret } from '@pikku/core/hmac'
import { SendgridService } from './sendgrid-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const sendgrid = new SendgridService(secrets)
  const sendgridWebhookSecret = new WebhookSigningSecret('SendGrid', async () => {
    const key = await credentialService?.get<string>('sendgridWebhookSecret')
    return key ? toPublicKeyPem(key) : null
  })

  return { sendgrid, sendgridWebhookSecret }
})

const toPublicKeyPem = (key: string) =>
  key.includes('BEGIN PUBLIC KEY')
    ? key
    : `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`
