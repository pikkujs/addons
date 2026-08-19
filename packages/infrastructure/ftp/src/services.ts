import { FtpService } from './ftp-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('ftp')
    if (!cred?.apiKey) {
      throw new Error('Missing ftp credential')
    }
    const ftp = new FtpService(cred, variables)

    return { ftp }
  }
)
