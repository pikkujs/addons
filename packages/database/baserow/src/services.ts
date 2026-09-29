import { WebhookSigningSecret } from '@pikku/core/hmac'
import { BaserowService } from './baserow-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('baserow')
    if (!cred?.apiKey) {
      throw new Error('Missing baserow credential')
    }
    const baserow = new BaserowService(cred, variables)

    return { baserow }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  baserowWebhookSecret: WebhookSigningSecret.fromCredential(
    'Baserow',
    credentialService,
    'baserowWebhookSecret'
  ),
}))
