import { WebhookSigningSecret } from '@pikku/core/hmac'
import { OnfleetService } from './onfleet-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('onfleet')
    if (!cred?.apiKey) {
      throw new Error('Missing onfleet credential')
    }
    const onfleet = new OnfleetService(cred, variables)

    return { onfleet }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  onfleetWebhookSecret: new WebhookSigningSecret(
    'Onfleet',
    await secrets
      .getSecret('ONFLEET_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
