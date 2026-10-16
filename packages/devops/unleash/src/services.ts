import { UnleashService } from './unleash-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('UNLEASH_CREDENTIALS')).reveal()
  const unleash = new UnleashService(creds)

  return { unleash }
})
