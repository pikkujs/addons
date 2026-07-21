import { DiscourseService } from './discourse-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('discourse')
    if (!cred?.apiKey) {
      throw new Error('Missing discourse credential')
    }
    const discourse = new DiscourseService(cred, variables)

    return { discourse }
  }
)
