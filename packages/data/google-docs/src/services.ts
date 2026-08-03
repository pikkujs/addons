import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleDocsService } from './google-docs-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleDocs')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Docs connection — connect Google Docs first')
    }
    const googleDocs = new GoogleDocsService(cred, variables)

    return { googleDocs }
  }
)
