import { WebhookSigningSecret } from '@pikku/core/hmac'
import { AsanaService } from './asana-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('asana')
    if (!cred?.token) {
      throw new Error('Missing asana credential')
    }
    const asana = new AsanaService(cred, variables)

    return { asana }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  asanaWebhookSecret: WebhookSigningSecret.fromCredential(
    'Asana',
    credentialService,
    'asanaWebhookSecret'
  ),
}))
