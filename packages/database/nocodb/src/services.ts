import { WebhookSigningSecret } from '@pikku/core/hmac'
import { NocodbService } from './nocodb-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential service unavailable')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('nocodb')
    if (!cred?.apiKey) {
      throw new Error('Missing nocodb credential')
    }
    const nocodb = new NocodbService(cred, variables)

    return { nocodb }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  nocodbWebhookSecret: new WebhookSigningSecret(
    'NocoDB',
    await secrets
      .getSecret('NOCODB_WEBHOOK_TOKEN')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
