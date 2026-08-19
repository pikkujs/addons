import { ZulipService } from './zulip-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('zulip')
    if (!cred?.apiKey) {
      throw new Error('Missing zulip credential')
    }
    const zulip = new ZulipService(cred, variables)

    return { zulip }
  }
)
