import { ZendeskService } from './zendesk-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential service unavailable')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('zendesk')
    if (!cred?.apiKey) {
      throw new Error('Missing zendesk credential')
    }
    const zendesk = new ZendeskService(cred, variables)

    return { zendesk }
  }
)
