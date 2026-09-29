import { WebhookSigningSecret } from '@pikku/core/hmac'
import { StrapiService } from './strapi-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('strapi')
    if (!cred?.token) {
      throw new Error('Missing strapi credential')
    }
    const strapi = new StrapiService(cred, variables)

    return { strapi }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  strapiWebhookSecret: WebhookSigningSecret.fromCredential(
    'Strapi',
    credentialService,
    'strapiWebhookSecret'
  ),
}))
