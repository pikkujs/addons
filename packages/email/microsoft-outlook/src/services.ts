import { UnauthorizedError } from '@pikku/core/errors'
import { MicrosoftOutlookService } from './microsoft-outlook-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('microsoftOutlook')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Microsoft Outlook connection — connect Microsoft Outlook first')
    }
    const microsoftOutlook = new MicrosoftOutlookService(cred, variables)

    return { microsoftOutlook }
  }
)
