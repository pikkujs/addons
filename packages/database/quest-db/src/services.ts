import { QuestDbService } from './quest-db-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('questDb')
    if (!cred?.apiKey) {
      throw new Error('Missing questDb credential')
    }
    const questDb = new QuestDbService(cred, variables)

    return { questDb }
  }
)
