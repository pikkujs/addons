import { UnauthorizedError } from '@pikku/core/errors'
import { MicrosoftExcelService } from './microsoft-excel-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('microsoftExcel')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Microsoft Excel (OneDrive) connection — connect Microsoft Excel (OneDrive) first')
    }
    const microsoftExcel = new MicrosoftExcelService(cred, variables)

    return { microsoftExcel }
  }
)
