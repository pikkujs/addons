import { AutomizyService } from './automizy-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('automizy')
    if (!cred?.token) {
      throw new Error('Missing automizy credential')
    }
    const automizy = new AutomizyService(cred, variables)

    return { automizy }
  }
)
