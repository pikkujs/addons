import { WebhookSigningSecret } from '@pikku/core/hmac'
import { WebflowService } from './webflow-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('webflow')
    if (!cred?.token) {
      throw new Error('Missing webflow credential')
    }
    const webflow = new WebflowService(cred, variables)

    return { webflow }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  webflowWebhookSecret: new WebhookSigningSecret(
    'Webflow',
    await secrets
      .getSecret('WEBFLOW_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
