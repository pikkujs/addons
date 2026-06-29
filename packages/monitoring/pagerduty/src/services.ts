import { PagerdutyService } from './pagerduty-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecret('PAGERDUTY_CREDENTIALS')
  const pagerduty = new PagerdutyService(creds)

  return { pagerduty }
})
