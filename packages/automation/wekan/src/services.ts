import { WebhookSigningSecret } from '@pikku/core/hmac'
import { WekanService } from './wekan-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('wekan')
    if (!cred?.apiKey) {
      throw new Error('Missing wekan credential')
    }
    const wekan = new WekanService(cred, variables)

    return { wekan }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  wekanWebhookSecret: WebhookSigningSecret.fromCredential(
    'Wekan',
    credentialService,
    'wekanWebhookSecret'
  ),
}))
