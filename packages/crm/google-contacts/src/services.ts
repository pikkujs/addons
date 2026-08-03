import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleContactsService } from './google-contacts-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleContacts')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Contacts connection — connect Google Contacts first')
    }
    const googleContacts = new GoogleContactsService(cred, variables)

    return { googleContacts }
  }
)
