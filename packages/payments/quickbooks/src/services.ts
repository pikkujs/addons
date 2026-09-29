import { WebhookSigningSecret } from '@pikku/core/hmac'
import { UnauthorizedError } from '@pikku/core/errors'
import { QuickbooksService } from './quickbooks-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('quickbooks')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No QuickBooks Online connection — connect QuickBooks Online first')
    }
    const quickbooks = new QuickbooksService(cred, variables)

    return { quickbooks }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  quickbooksWebhookSecret: WebhookSigningSecret.fromCredential(
    'QuickBooks',
    credentialService,
    'quickbooksWebhookSecret'
  ),
}))
