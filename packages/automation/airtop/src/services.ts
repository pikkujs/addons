import { AirtopService } from './airtop-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('airtop')
    if (!cred?.token) {
      throw new Error('Missing airtop credential')
    }
    const airtop = new AirtopService(cred, variables)

    return { airtop }
  }
)
