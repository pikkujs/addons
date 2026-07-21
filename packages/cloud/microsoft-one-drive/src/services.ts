import { MicrosoftOneDriveService } from './microsoft-one-drive-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const microsoftOneDrive = new MicrosoftOneDriveService(secrets, variables)

  return { microsoftOneDrive }
})
