import { EmeliaService } from './emelia-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('emelia')
    if (!cred?.apiKey) {
      throw new Error('Missing emelia credential')
    }
    const emelia = new EmeliaService(cred, variables)

    return { emelia }
  }
)
