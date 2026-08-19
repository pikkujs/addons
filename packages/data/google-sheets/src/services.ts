import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleSheetsService } from './google-sheets-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleSheets')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Sheets connection — connect Google Sheets first')
    }
    const googleSheets = new GoogleSheetsService(cred, variables)

    return { googleSheets }
  }
)
