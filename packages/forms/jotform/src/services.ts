import { JotformService } from './jotform-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('JOTFORM_CREDENTIALS')
  const jotform = new JotformService(creds)

  return { jotform }
})
