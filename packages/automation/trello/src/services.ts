import { WebhookSigningSecret } from '@pikku/core/hmac'
import { TrelloService } from './trello-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('trello')
    if (!cred?.apiKey) {
      throw new Error('Missing trello credential')
    }
    const trello = new TrelloService(cred, variables)

    return { trello }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  trelloWebhookSecret: WebhookSigningSecret.fromCredential(
    'Trello',
    credentialService,
    'trelloWebhookSecret'
  ),
}))
