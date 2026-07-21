import { GoogleDriveService } from './google-drive-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleDrive = new GoogleDriveService(secrets, variables)

  return { googleDrive }
})
