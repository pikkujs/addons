import { GitlabService } from './gitlab-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('gitlab')
    if (!cred?.apiKey) {
      throw new Error('Missing gitlab credential')
    }
    const gitlab = new GitlabService(cred, variables)

    return { gitlab }
  }
)
