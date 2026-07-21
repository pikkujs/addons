import { MicrosoftOutlookService } from './microsoft-outlook-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const microsoftOutlook = new MicrosoftOutlookService(secrets, variables)

  return { microsoftOutlook }
})
