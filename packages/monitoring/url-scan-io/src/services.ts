import { UrlScanIoService } from './url-scan-io-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('urlScanIo')
    if (!cred?.apiKey) {
      throw new Error('Missing urlScanIo credential')
    }
    const urlScanIo = new UrlScanIoService(cred, variables)

    return { urlScanIo }
  }
)
