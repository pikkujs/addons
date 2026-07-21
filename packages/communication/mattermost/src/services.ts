import { MattermostService } from './mattermost-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential service unavailable')
    }
    const cred = await wire.getCredential<{ token: string }>('mattermost')
    if (!cred?.token) {
      throw new Error('Missing mattermost credential')
    }
    const mattermost = new MattermostService(cred, variables)

    return { mattermost }
  }
)
