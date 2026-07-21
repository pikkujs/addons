import { DropcontactService } from './dropcontact-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('dropcontact')
    if (!cred?.apiKey) {
      throw new Error('Missing dropcontact credential')
    }
    const dropcontact = new DropcontactService(cred, variables)

    return { dropcontact }
  }
)
