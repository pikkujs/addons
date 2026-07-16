import { GoogleContactsService } from './google-contacts-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleContacts = new GoogleContactsService(secrets, variables)

  return { googleContacts }
})
