import { UnauthorizedError } from '@pikku/core/errors'
import { MicrosoftOneDriveService } from './microsoft-one-drive-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('microsoftOneDrive')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Microsoft OneDrive connection — connect Microsoft OneDrive first')
    }
    const microsoftOneDrive = new MicrosoftOneDriveService(cred, variables)

    return { microsoftOneDrive }
  }
)
