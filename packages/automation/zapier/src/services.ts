import { ZapierService } from './zapier-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('ZAPIER_CREDENTIALS')
  const zapier = new ZapierService(creds)

  return { zapier }
})
