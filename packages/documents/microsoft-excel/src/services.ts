import { MicrosoftExcelService } from './microsoft-excel-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const microsoftExcel = new MicrosoftExcelService(secrets, variables)

  return { microsoftExcel }
})
