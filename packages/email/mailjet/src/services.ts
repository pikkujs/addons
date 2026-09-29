import { WebhookSigningSecret } from '@pikku/core/hmac'
import { MailjetService } from './mailjet-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('mailjet')
    if (!cred?.apiKey) {
      throw new Error('Missing mailjet credential')
    }
    const mailjet = new MailjetService(cred, variables)

    return { mailjet }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  mailjetWebhookSecret: WebhookSigningSecret.fromCredential(
    'Mailjet',
    credentialService,
    'mailjetWebhookSecret'
  ),
}))
