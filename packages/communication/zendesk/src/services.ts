import { WebhookSigningSecret } from '@pikku/core/hmac'
import { ZendeskService } from './zendesk-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential service unavailable')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('zendesk')
    if (!cred?.apiKey) {
      throw new Error('Missing zendesk credential')
    }
    const zendesk = new ZendeskService(cred, variables)

    return { zendesk }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  zendeskWebhookSecret: new WebhookSigningSecret(
    'Zendesk',
    await secrets
      .getSecret('ZENDESK_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
