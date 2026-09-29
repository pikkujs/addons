import { WebhookSigningSecret } from '@pikku/core/hmac'
import { MondayComService } from './monday-com-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('mondayCom')
    if (!cred?.apiKey) {
      throw new Error('Missing mondayCom credential')
    }
    const mondayCom = new MondayComService(cred, variables)

    return { mondayCom }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  mondayComWebhookSecret: WebhookSigningSecret.fromCredential(
    'monday.com',
    credentialService,
    'mondayComWebhookSecret'
  ),
}))
