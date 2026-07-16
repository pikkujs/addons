import { StrapiService } from './strapi-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ token: string }>('strapi')
    if (!cred?.token) {
      throw new Error('Missing strapi credential')
    }
    const strapi = new StrapiService(cred, variables)

    return { strapi }
  }
)
