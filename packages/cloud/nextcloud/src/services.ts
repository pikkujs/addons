import { NextcloudService } from './nextcloud-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('nextcloud')
    if (!cred?.apiKey) {
      throw new Error('Missing nextcloud credential')
    }
    const nextcloud = new NextcloudService(cred, variables)

    return { nextcloud }
  }
)
