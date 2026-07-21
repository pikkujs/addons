import { OpenThesaurusService } from './open-thesaurus-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('openThesaurus')
    if (!cred?.apiKey) {
      throw new Error('Missing openThesaurus credential')
    }
    const openThesaurus = new OpenThesaurusService(cred, variables)

    return { openThesaurus }
  }
)
