import { IterableService } from './iterable-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('iterable')
    if (!cred?.apiKey) {
      throw new Error('Missing iterable credential')
    }
    const iterable = new IterableService(cred, variables)

    return { iterable }
  }
)
