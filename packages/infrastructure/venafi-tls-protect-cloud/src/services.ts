import { VenafiTlsProtectCloudService } from './venafi-tls-protect-cloud-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('venafiTlsProtectCloud')
    if (!cred?.apiKey) {
      throw new Error('Missing venafiTlsProtectCloud credential')
    }
    const venafiTlsProtectCloud = new VenafiTlsProtectCloudService(cred, variables)

    return { venafiTlsProtectCloud }
  }
)
