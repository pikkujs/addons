import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleDriveService } from './google-drive-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleDrive')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Drive connection — connect Google Drive first')
    }
    const googleDrive = new GoogleDriveService(cred, variables)

    return { googleDrive }
  }
)
