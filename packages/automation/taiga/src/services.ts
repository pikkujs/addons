import { WebhookSigningSecret } from '@pikku/core/hmac'
import { TaigaService } from './taiga-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('taiga')
    if (!cred?.apiKey) {
      throw new Error('Missing taiga credential')
    }
    const taiga = new TaigaService(cred, variables)

    return { taiga }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  taigaWebhookSecret: new WebhookSigningSecret(
    'Taiga',
    await secrets
      .getSecret('TAIGA_WEBHOOK_KEY')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
