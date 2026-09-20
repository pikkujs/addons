import { TypesafeService } from './typesafe-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => {
  const creds = (await secrets.getSecret('TYPESAFE_CREDENTIALS')).reveal()
  const typesafe = new TypesafeService(creds.apiKey, creds.model)

  return { typesafe }
})
