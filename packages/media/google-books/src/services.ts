import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleBooksService } from './google-books-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleBooks')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Books connection — connect Google Books first')
    }
    const googleBooks = new GoogleBooksService(cred, variables)

    return { googleBooks }
  }
)
