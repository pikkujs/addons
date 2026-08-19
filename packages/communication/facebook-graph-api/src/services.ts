import { FacebookGraphApiService } from './facebook-graph-api-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('facebookGraphApi')
    if (!cred?.apiKey) {
      throw new Error('Missing facebookGraphApi credential')
    }
    const facebookGraphApi = new FacebookGraphApiService(cred, variables)

    return { facebookGraphApi }
  }
)
