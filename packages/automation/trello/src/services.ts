import { TrelloService } from './trello-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('trello')
    if (!cred?.apiKey) {
      throw new Error('Missing trello credential')
    }
    const trello = new TrelloService(cred, variables)

    return { trello }
  }
)
