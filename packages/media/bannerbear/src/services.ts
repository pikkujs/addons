import { BannerbearService } from './bannerbear-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('bannerbear')
    if (!cred?.token) {
      throw new Error('Missing bannerbear credential')
    }
    const bannerbear = new BannerbearService(cred, variables)

    return { bannerbear }
  }
)
