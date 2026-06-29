import { TypeformService } from './typeform-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('TYPEFORM_CREDENTIALS')
  const typeform = new TypeformService(creds)

  return { typeform }
})
