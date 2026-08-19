import { TheHiveService } from './the-hive-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('theHive')
    if (!cred?.token) {
      throw new Error('Missing theHive credential')
    }
    const theHive = new TheHiveService(cred, variables)

    return { theHive }
  }
)
