import { Msg91Service } from './msg91-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('msg91')
    if (!cred?.apiKey) {
      throw new Error('Missing msg91 credential')
    }
    const msg91 = new Msg91Service(cred, variables)

    return { msg91 }
  }
)
