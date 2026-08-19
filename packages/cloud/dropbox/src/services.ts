import { UnauthorizedError } from '@pikku/core/errors'
import { DropboxService } from './dropbox-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('dropbox')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Dropbox connection — connect Dropbox first')
    }
    const dropbox = new DropboxService(cred, variables)

    return { dropbox }
  }
)
