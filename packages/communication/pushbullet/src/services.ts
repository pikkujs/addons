import { PushbulletService } from './pushbullet-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('pushbullet')
    if (!cred?.apiKey) {
      throw new Error('Missing pushbullet credential')
    }
    const pushbullet = new PushbulletService(cred, variables)

    return { pushbullet }
  }
)
