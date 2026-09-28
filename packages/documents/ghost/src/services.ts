import { WebhookSigningSecret } from '@pikku/core/hmac'
import { GhostService } from './ghost-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('ghost')
    if (!cred?.apiKey) {
      throw new Error('Missing ghost credential')
    }
    const ghost = new GhostService(cred, variables)

    return { ghost }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  ghostWebhookSecret: new WebhookSigningSecret(
    'Ghost',
    await secrets
      .getSecret('GHOST_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
