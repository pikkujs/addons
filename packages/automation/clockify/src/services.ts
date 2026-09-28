import { WebhookSigningSecret } from '@pikku/core/hmac'
import { ClockifyService } from './clockify-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('clockify')
    if (!cred?.apiKey) {
      throw new Error('Missing clockify credential')
    }
    const clockify = new ClockifyService(cred, variables)

    return { clockify }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  clockifyWebhookSecret: new WebhookSigningSecret(
    'Clockify',
    await secrets
      .getSecret('CLOCKIFY_WEBHOOK_TOKEN')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
