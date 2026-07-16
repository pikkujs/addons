import { MatrixService } from './matrix-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('matrix')
    if (!cred?.token) {
      throw new Error('Missing matrix credential')
    }
    const matrix = new MatrixService(cred, variables)

    return { matrix }
  }
)
