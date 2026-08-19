import { DeeplService } from './deepl-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('DEEPL_CREDENTIALS')).reveal()
  const deepl = new DeeplService(creds)

  return { deepl }
})
