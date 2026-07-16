import { DropboxService } from './dropbox-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const dropbox = new DropboxService(secrets, variables)

  return { dropbox }
})
