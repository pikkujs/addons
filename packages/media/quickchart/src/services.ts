import { QuickchartService } from './quickchart-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('quickchart')
    if (!cred?.apiKey) {
      throw new Error('Missing quickchart credential')
    }
    const quickchart = new QuickchartService(cred, variables)

    return { quickchart }
  }
)
