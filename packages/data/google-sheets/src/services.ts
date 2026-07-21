import { GoogleSheetsService } from './google-sheets-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleSheets = new GoogleSheetsService(secrets, variables)

  return { googleSheets }
})
