import { MetaConversionsService } from './meta-conversions-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('META_CONVERSIONS_CREDENTIALS')).reveal()
  const metaConversions = new MetaConversionsService(creds)

  return { metaConversions }
})
