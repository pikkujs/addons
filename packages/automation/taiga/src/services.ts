import { TaigaService } from './taiga-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('taiga')
    if (!cred?.apiKey) {
      throw new Error('Missing taiga credential')
    }
    const taiga = new TaigaService(cred, variables)

    return { taiga }
  }
)
