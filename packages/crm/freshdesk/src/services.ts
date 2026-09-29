import { WebhookSigningSecret } from '@pikku/core/hmac'
import { FreshdeskService } from './freshdesk-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('freshdesk')
    if (!cred?.apiKey) {
      throw new Error('Missing freshdesk credential')
    }
    const freshdesk = new FreshdeskService(cred, variables)

    return { freshdesk }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  freshdeskWebhookSecret: WebhookSigningSecret.fromCredential(
    'Freshdesk',
    credentialService,
    'freshdeskWebhookSecret'
  ),
}))
