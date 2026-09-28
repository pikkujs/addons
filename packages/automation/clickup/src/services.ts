import { WebhookSigningSecret } from '@pikku/core/hmac'
import { ClickupService } from './clickup-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('clickup')
    if (!cred?.apiKey) {
      throw new Error('Missing clickup credential')
    }
    const clickup = new ClickupService(cred, variables)

    return { clickup }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  clickupWebhookSecret: new WebhookSigningSecret(
    'ClickUp',
    await secrets
      .getSecret('CLICKUP_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
