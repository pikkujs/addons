import { TypeformService } from './typeform-api.service.js'
import type { TypeformCredentials } from './typeform.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<TypeformCredentials>('TYPEFORM_CREDENTIALS')
  const typeform = new TypeformService(creds)

  return { typeform }
})
